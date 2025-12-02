import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: { sub: number; username: string }) {

    const user=await this.prisma.user.findUnique({
      where:{
        id:payload.sub,
      }
    })
    if(!user) {
      throw new Error('Unauthorized');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  
  }
}
