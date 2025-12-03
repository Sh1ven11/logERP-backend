import { Controller, Get, UseGuards,Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/common/guard';

@Controller('users')
export class UserController {
    @UseGuards(JwtGuard)
    @Get()
    getUsers(@Req() req: Request & { user?: any }) {
        return req.user;
    }
}
