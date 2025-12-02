import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {

    constructor(private prisma : PrismaService, private jwt:JwtService, private config:ConfigService) {}
    async login(body:LoginDto){
        const hash = await argon2.hash(body.password);
        const user =await this.prisma.user.findUnique({
            where:{
                username:body.username,
            }
        })
        if(!user)throw new ForbiddenException('Incorrect Credentials')
        // Implement login logic here
        const pwMatches = await argon2.verify(user.password, body.password);
        if(!pwMatches) throw new ForbiddenException('Incorrect Credentials')
        const { password, ...userWithoutPassword } = user;
        return this.signToken(user.id, user.username);
    
    }   
    async signToken(userId:number, username:string):Promise<{access_token:string}>{ 
        const payload={
            sub:userId,
            username
        }
        const secret=this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload,{
            expiresIn:'15m',
            secret: secret,
        })
        return {access_token:token};
    }
}
