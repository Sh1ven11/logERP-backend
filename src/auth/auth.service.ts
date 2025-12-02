import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {

    constructor(private prisma : PrismaService) {}
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
        return { message: 'Login Successful', user: userWithoutPassword }
    
    }   
}
