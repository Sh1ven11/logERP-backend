import { Module } from '@nestjs/common';
import { ConsignmentService } from './consignment.service';
import { ConsignmentController } from './consignment.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ConsignmentController],
  providers: [ConsignmentService, PrismaService],
})
export class ConsignmentModule {}
