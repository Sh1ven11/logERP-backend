import { IsInt, IsOptional, IsNumber, IsDateString, IsArray } from "class-validator";

export class CreateInvoiceDto {
  @IsDateString()
  invoiceDate: string;

  @IsInt()
  companyId: number;

  @IsInt()
  branchId: number;

  @IsInt()
  customerId: number;

  @IsNumber()
  billAmount: number;

  @IsOptional()
  @IsNumber()
  deduction?: number;

  @IsOptional()
  @IsNumber()
  tdsDeducted?: number;

  @IsOptional()
  @IsNumber()
  creditDays?: number;

  @IsOptional()
  @IsNumber()
  stagingChargeRate?: number;

  @IsOptional()
  @IsNumber()
  stagingChargeAmount?: number;

  @IsOptional()
  @IsNumber()
  csRate?: number;

  @IsOptional()
  @IsNumber()
  insurance?: number;

  @IsOptional()
  @IsNumber()
  otherCharges?: number;

  @IsOptional()
  @IsNumber()
  gstPercent?: number;

  @IsArray()
  consignmentIds: number[];

  @IsOptional()
  remarks?: string;

  @IsOptional()
  notes?: string;
}
