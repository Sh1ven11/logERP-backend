import { IsOptional, IsString, IsNumber } from 'class-validator';

export class SearchConsignmentDto {
  @IsOptional()
  @IsString()
  cnNumber?: string;

  @IsOptional()
  @IsString()
  vehicleNo?: string;

  @IsOptional()
  @IsNumber()
  consignorId?: number;

  @IsOptional()
  @IsNumber()
  consigneeId?: number;

  @IsOptional()
  @IsNumber()
  companyId?: number;

  @IsOptional()
  @IsNumber()
  branchId?: number;

  @IsOptional()
  @IsNumber()
  financialYearId?: number;
}
