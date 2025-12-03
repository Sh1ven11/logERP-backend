import { Module } from '@nestjs/common';
import { BrokersService } from './brokers.service';
import { BrokersController } from './brokers.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BrokersController],
  providers: [BrokersService, PrismaService],
})
export class BrokersModule {}
