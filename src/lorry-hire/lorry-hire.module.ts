import { Module } from '@nestjs/common';
import { LorryHireController } from './lorry-hire.controller';
import { LorryHireService } from './lorry-hire.service';

@Module({
  controllers: [LorryHireController],
  providers: [LorryHireService]
})
export class LorryHireModule {}
