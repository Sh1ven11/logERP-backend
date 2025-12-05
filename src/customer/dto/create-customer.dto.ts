import { IsString, IsOptional, IsInt, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    example: "CUST-JDL-001",
    description: "Unique customer code (from legacy or internal system)",
  })
  @IsString()
  companyCode: string;

  @ApiProperty({
    example: "Jindal Steel Pune",
    description: "Registered company name of the customer",
  })
  @IsString()
  companyName: string;

  @ApiProperty({
    example: "JDL Pune",
    description: "Name printed on bills for this customer",
  })
  @IsString()
  billName: string;

  @ApiPropertyOptional({
    example: "Jindal Group",
    description: "Customer grouping category (optional)",
  })
  @IsOptional()
  @IsString()
  companyGroup?: string;

  @ApiPropertyOptional({
    example: "Pune Main Road",
    description: "Address line 1 of the customer",
  })
  @IsOptional()
  @IsString()
  address1?: string;

  @ApiPropertyOptional({
    example: "Near Market Yard",
    description: "Address line 2 of the customer",
  })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiPropertyOptional({
    example: "Pune, Maharashtra",
    description: "Address line 3 of the customer",
  })
  @IsOptional()
  @IsString()
  address3?: string;

  @ApiPropertyOptional({
    example: "9876543210",
    description: "Customer phone number",
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: 1000,
    description: "Opening debit amount (optional)",
  })
  @IsOptional()
  @IsNumber()
  debit?: number;

  @ApiPropertyOptional({
    example: 200,
    description: "Opening credit amount (optional)",
  })
  @IsOptional()
  @IsNumber()
  credit?: number;

  @ApiPropertyOptional({
    example: 30,
    description: "Credit days allowed for this customer",
  })
  @IsOptional()
  @IsInt()
  creditDays?: number;

  @ApiPropertyOptional({
    example: 12,
    description: "Interest rate applicable (optional)",
  })
  @IsOptional()
  @IsNumber()
  interestRate?: number;

  @ApiProperty({
    example: 1,
    description: "Company to which this customer belongs",
  })
  @IsInt()
  companyId: number;
}
