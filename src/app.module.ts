import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { CustomerModule } from './customer/customer.module';
import { CustomerService } from './customer/customer.service';  
import { BrokersModule } from './brokers/brokers.module';
@Module({
  imports: [PrismaModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), CustomerModule, BrokersModule],
  controllers: [UserController],
})
export class AppModule {}
