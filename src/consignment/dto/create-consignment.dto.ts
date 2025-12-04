import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateConsignmentDto {
  @IsString()
  cnNumber: string;   // manually entered (pre-printed)

  @IsDateString()
  date: string;

  @IsNumber()
  companyId: number;

  @IsNumber()
  branchId: number;

  @IsNumber()
  consignorId: number;

  @IsNumber()
  consigneeId: number;

  @IsString()
  fromLocation: string;

  @IsString()
  toLocation: string;

  @IsNumber()
  packages: number;

  @IsString()
  packageUom: string;

  @IsString()
  contents: string;

  @IsOptional()
  @IsString()
  gstPayableAt?: string;

  @IsOptional()
  @IsNumber()
  netWeight?: number;

  @IsOptional()
  @IsNumber()
  grossWeight?: number;

  @IsOptional()
  @IsNumber()
  chargeWeight?: number;

  @IsString()
  weightUom: string;

  @IsOptional()
  @IsNumber()
  rate?: number;

  @IsOptional()
  @IsString()
  rateOn?: string;

  @IsOptional()
  @IsNumber()
  freightCharges?: number;

  @IsOptional()
  @IsString()
  vehicleNo?: string;

  @IsOptional()
  @IsString()
  driverName?: string;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @IsNumber()
  brokerId?: number;
}
