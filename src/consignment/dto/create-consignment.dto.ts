import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConsignmentDto {
  // -------------------------
  // CORE IDENTIFIERS
  // -------------------------

  @ApiProperty({
    example: "1001",
    description: "Pre-printed consignment note number (unique per company + financial year)",
  })
  @IsString()
  cnNumber: string;

  @ApiProperty({
    example: "2024-04-12",
    description: "Consignment date (ISO format)",
  })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  companyId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  branchId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  financialYearId: number;

  // -------------------------
  // PARTIES
  // -------------------------

  @ApiProperty({
    example: 5,
    description: "Customer ID of consignor (sender)",
  })
  @IsInt()
  consignorId: number;

  @ApiProperty({
    example: 6,
    description: "Customer ID of consignee (receiver)",
  })
  @IsInt()
  consigneeId: number;

  @ApiProperty({
    example: 6,
    description: "Customer ID who will be billed (defaults to consignee)",
  })
  @IsInt()
  billedToId: number;

  // -------------------------
  // ROUTE
  // -------------------------

  @ApiProperty({ example: 3 })
  @IsInt()
  fromDestinationId: number;

  @ApiProperty({ example: 4 })
  @IsInt()
  toDestinationId: number;

  // -------------------------
  // CARGO
  // -------------------------

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsInt()
  packages?: number;

  @ApiPropertyOptional({ example: "bags" })
  @IsOptional()
  @IsString()
  packageUom?: string;

  @ApiPropertyOptional({ example: "Steel rods (Grade A)" })
  @IsOptional()
  @IsString()
  contents?: string;

  // -------------------------
  // WEIGHT & RATE
  // -------------------------

  @ApiPropertyOptional({ example: "Destination" })
  @IsOptional()
  @IsString()
  gstPayableAt?: string;

  @ApiPropertyOptional({ example: 950 })
  @IsOptional()
  @IsNumber()
  netWeight?: number;

  @ApiPropertyOptional({ example: 1000 })
  @IsOptional()
  @IsNumber()
  grossWeight?: number;

  @ApiPropertyOptional({ example: 980 })
  @IsOptional()
  @IsNumber()
  chargeWeight?: number;

  @ApiPropertyOptional({ example: "mt" })
  @IsOptional()
  @IsString()
  weightUom?: string;

  @ApiPropertyOptional({ example: 150 })
  @IsOptional()
  @IsNumber()
  rate?: number;

  @ApiPropertyOptional({ example: "mt" })
  @IsOptional()
  @IsString()
  rateOn?: string;

  // -------------------------
  // MISC
  // -------------------------

  @ApiPropertyOptional({ example: "Handle with care" })
  @IsOptional()
  @IsString()
  remarks?: string;
}
