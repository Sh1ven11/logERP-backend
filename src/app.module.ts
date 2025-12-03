import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { ClientsModule } from './customer/customer.module';
import { CustomerService } from './customer/customer.service';  
@Module({
  imports: [PrismaModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), CustomerService, ClientsModule],
  controllers: [UserController],
})
export class AppModule {}
