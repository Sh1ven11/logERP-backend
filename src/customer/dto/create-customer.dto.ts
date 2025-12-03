import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  companyCode: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
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
  @IsNumber()
  creditDays?: number;

  @IsOptional()
  @IsNumber()
  interestRate?: number;
}
