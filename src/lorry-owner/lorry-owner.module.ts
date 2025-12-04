import { Module } from '@nestjs/common';
import { LorryOwnerService } from './lorry-owner.service';
import { LorryOwnerController } from './lorry-owner.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LorryOwnerController],
  providers: [LorryOwnerService, PrismaService],
})
export class LorryOwnerModule {}
