import { IsString, IsOptional, IsInt, IsNumber } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  companyCode: string;

  @IsString()
  companyName: string;

  @IsString()
  billName: string;

  @IsOptional()
  @IsString()
  companyGroup?: string;

  @IsOptional()
  @IsString()
  address1?: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString()
  address3?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNumber()
  debit?: number;

  @IsOptional()
  @IsNumber()
  credit?: number;

  @IsOptional()
  @IsInt()
  creditDays?: number;

  @IsOptional()
  @IsNumber()
  interestRate?: number;

  @IsInt()
  companyId: number;   // 🔥 REQUIRED

}
