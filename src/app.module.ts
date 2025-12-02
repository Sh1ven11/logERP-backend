import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
@Module({
  imports: [PrismaModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UserController],
})
export class AppModule {}
