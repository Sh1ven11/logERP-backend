import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { ApiProperty } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService ) { }

    @Post('login')
    async login(@Body() dto:LoginDto) {
        // Implement login logic here
        console.log('Login attempt:', dto);
        return this.authService.login(dto);
    }

}
