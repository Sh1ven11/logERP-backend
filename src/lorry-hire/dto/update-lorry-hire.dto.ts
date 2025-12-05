import { PartialType } from '@nestjs/mapped-types';
import { CreateLorryHireDto } from './create-lorry-hire.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class UpdateLorryHireDto extends PartialType(CreateLorryHireDto) {

  @ApiPropertyOptional({
    example: true,
    description: "Mark challan as settled/unsettled"
  })
  @IsOptional()
  @IsBoolean()
  isSettled?: boolean;

  @ApiPropertyOptional({
    example: "2025-01-15",
    description: "Payment date when marking challan as settled"
  })
  @IsOptional()
  @IsDateString()
  paymentDate?: string;
}
