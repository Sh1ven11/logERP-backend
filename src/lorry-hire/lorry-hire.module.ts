import { Module } from '@nestjs/common';
import { LorryHireService } from './lorry-hire.service';
import { LorryHireController } from './lorry-hire.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LorryHireController],
  providers: [LorryHireService, PrismaService],
})
export class LorryHireModule {}
