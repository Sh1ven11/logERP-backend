import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { CustomerModule } from './customer/customer.module';
import { CustomerService } from './customer/customer.service';  
import { BrokersModule } from './brokers/brokers.module';
import { CompanyModule } from './company/company.module';
import { CustomerGroupModule } from './customer-group/customer-group.module';
import { ConsignmentModule } from './consignment/consignment.module';
import { LorryOwnerModule } from './lorry-owner/lorry-owner.module';
@Module({
  imports: [PrismaModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), CustomerModule, BrokersModule, CompanyModule, CustomerGroupModule, ConsignmentModule, LorryOwnerModule],
  controllers: [UserController],
})
export class AppModule {}
