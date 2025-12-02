import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {

    constructor(private prisma : PrismaService) {   }
    async login(body:LoginDto){
        const hash = await argon2.hash(body.password);
        // Implement login logic here
        return {message: "Login successful", data: body, hash};
    }   
}
