import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer'; // ⬅️ Import Type

export class SearchLorryHireDto {
  @ApiPropertyOptional({ example: "LHC-2024-0001" })
  @IsOptional()
  @IsString()
  challanNumber?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number) // ⬅️ Transform string to number
  @IsNumber()
  companyId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number) // ⬅️ Transform string to number
  @IsNumber()
  branchId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number) // ⬅️ Transform string to number
  @IsNumber()
  financialYearId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number) // ⬅️ Transform string to number
  @IsNumber()
  lorryOwnerId?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean) // ⬅️ Transform string ("true"/"false") to boolean
  @IsBoolean()
  isSettled?: boolean;
}