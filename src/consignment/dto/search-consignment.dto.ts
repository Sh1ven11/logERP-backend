import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchConsignmentDto {
  @ApiPropertyOptional({
    example: "1001",
    description: "Filter by consignment number",
  })
  @IsOptional()
  @IsString()
  cnNumber?: string;

  @ApiPropertyOptional({
    example: "MH12AB1234",
    description: "Filter by vehicle number",
  })
  @IsOptional()
  @IsString()
  vehicleNo?: string;

  @ApiPropertyOptional({
    example: 1,
    description: "Filter by consignor customer ID",
  })
  @IsOptional()
  @IsNumber()
  consignorId?: number;

  @ApiPropertyOptional({
    example: 2,
    description: "Filter by consignee customer ID",
  })
  @IsOptional()
  @IsNumber()
  consigneeId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: "Filter by company ID",
  })
  @IsOptional()
  @IsNumber()
  companyId?: number;

  @ApiPropertyOptional({
    example: 2,
    description: "Filter by branch ID",
  })
  @IsOptional()
  @IsNumber()
  branchId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: "Filter by financial year ID",
  })
  @IsOptional()
  @IsNumber()
  financialYearId?: number;
}
