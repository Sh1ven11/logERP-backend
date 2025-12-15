import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SearchConsignmentDto {
  @ApiPropertyOptional({ example: "1001" })
  @IsOptional()
  @IsString()
  cnNumber?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  consignorId?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  consigneeId?: number;

  // ⭐ ADDED
  @ApiPropertyOptional({
    example: 3,
    description: "Customer who will be billed",
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  billedToId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  companyId?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  branchId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  financialYearId?: number;

  // ⭐ STRONGLY RECOMMENDED
  @ApiPropertyOptional({ example: "2024-04-01" })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional({ example: "2024-04-30" })
  @IsOptional()
  @IsDateString()
  toDate?: string;
}
