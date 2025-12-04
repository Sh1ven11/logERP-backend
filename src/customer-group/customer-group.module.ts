import { Module } from '@nestjs/common';
import { CustomerGroupService } from './customer-group.service';
import { CustomerGroupController } from './customer-group.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CustomerGroupController],
  providers: [CustomerGroupService, PrismaService],
})
export class CustomerGroupModule {}
