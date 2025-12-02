import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUsers() {
        return [{ id: 1, name: 'John Doe' }];
    }
}
