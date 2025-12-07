import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // ------------------------f-
  // LOGIN
  // -------------------------
  async login(body: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: body.username },
    });

    if (!user) throw new ForbiddenException('Incorrect Credentials');

    const pwMatches = await argon2.verify(user.password, body.password);
    if (!pwMatches) throw new ForbiddenException('Incorrect Credentials');

    // Generate tokens
    const tokens = await this.getTokens(user.id, user.username);

    // store hashed refresh token in DB
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  // -------------------------
  // GENERATE TOKENS
  // -------------------------
  async getTokens(userId: number, username: string) {
    const jwtSecret = this.config.get<string>('JWT_SECRET');

    const payload = {
      sub: userId,
      username,
    };

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: jwtSecret,
    });

    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: jwtSecret,
    });

    return { access_token, refresh_token };
  }

  // -------------------------
  // SAVE HASHED REFRESH TOKEN
  // -------------------------
  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRt = await argon2.hash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRt },
    });
  }

  // -------------------------
  // REFRESH TOKEN LOGIC
  // -------------------------
  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refreshToken)
      throw new UnauthorizedException('Access Denied');

    const rtMatches = await argon2.verify(user.refreshToken, refreshToken);
    if (!rtMatches) throw new UnauthorizedException('Access Denied');

    const tokens = await this.getTokens(user.id, user.username);

    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  // -------------------------
  // LOGOUT
  // -------------------------
  async logout(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return { message: 'Logged out' };
  }
}
