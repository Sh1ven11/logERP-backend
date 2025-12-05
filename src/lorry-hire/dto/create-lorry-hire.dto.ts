import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsInt, IsArray } from 'class-validator';

export class CreateLorryHireDto {
  @ApiProperty({ example: "LHC-2024-0001", description: "Challan number (unique per company/year or manual)" })
  @IsString()
  challanNumber: string;

  @ApiProperty({ example: "2024-05-10", description: "Challan date (ISO)" })
  @IsDateString()
  challanDate: string;

  @ApiPropertyOptional({ example: "2024-05-11", description: "Date when lorry hired / trip date" })
  @IsOptional()
  @IsDateString()
  lorryHireDate?: string;

  @ApiProperty({ example: "MH12AB1234", description: "Vehicle number" })
  @IsString()
  vehicleNo: string;

  @ApiPropertyOptional({ example: "SLIP123", description: "Slip number from transporter" })
  @IsOptional()
  @IsString()
  slipNo?: string;

  @ApiPropertyOptional({ example: "Urgent delivery", description: "Remarks" })
  @IsOptional()
  @IsString()
  remarks?: string;

  @ApiProperty({ example: 1, description: "Lorry owner ID (link to LorryOwner)" })
  @IsInt()
  lorryOwnerId: number;

  @ApiPropertyOptional({ example: 2, description: "Optional broker ID" })
  @IsOptional()
  @IsInt()
  brokerId?: number;

  @ApiPropertyOptional({ example: "ABCDE1234F", description: "PAN used for payment (owner or broker)" })
  @IsOptional()
  @IsString()
  panCardUsed?: string;

  @ApiPropertyOptional({ example: true, description: "Whether TDS applies" })
  @IsOptional()
  @IsBoolean()
  tdsApplicable?: boolean;

  @ApiPropertyOptional({ example: 2, description: "TDS percentage if applicable" })
  @IsOptional()
  @IsNumber()
  tdsPercent?: number;

  @ApiProperty({ example: 1, description: "Destination ID (should come from your Destination master)" })
  @IsInt()
  destinationId: number;

  @ApiPropertyOptional({ example: 12, description: "Total packages for the challan (can be computed after adding consignments)" })
  @IsOptional()
  @IsInt()
  totalPackages?: number;

  @ApiPropertyOptional({ example: 980, description: "Total weight (kg or mt) - can be computed" })
  @IsOptional()
  @IsNumber()
  totalWeight?: number;

  @ApiPropertyOptional({ example: 150, description: "Rate (per unit - mt or fixed)" })
  @IsOptional()
  @IsNumber()
  rate?: number;

  @ApiPropertyOptional({ example: 147000, description: "Total lorry hire amount" })
  @IsOptional()
  @IsNumber()
  lorryHire?: number;

  @ApiPropertyOptional({ example: 20000, description: "Advance paid" })
  @IsOptional()
  @IsNumber()
  advancePaid?: number;

  @ApiPropertyOptional({ example: 0, description: "Balance payable (lorryHire - advance - tds - other)" })
  @IsOptional()
  @IsNumber()
  balancePayable?: number;

  @ApiPropertyOptional({ example: 500, description: "Loading charges" })
  @IsOptional()
  @IsNumber()
  loadingCharges?: number;

  @ApiPropertyOptional({ example: 300, description: "Unloading charges" })
  @IsOptional()
  @IsNumber()
  unloadingCharges?: number;

  @ApiPropertyOptional({ example: 0, description: "Diesel advance" })
  @IsOptional()
  @IsNumber()
  dieselAdvance?: number;

  @ApiPropertyOptional({ example: false, description: "Whether GST applies on this hire" })
  @IsOptional()
  @IsBoolean()
  gstApplicable?: boolean;

  @ApiPropertyOptional({ example: 0, description: "GST amount if applicable" })
  @IsOptional()
  @IsNumber()
  gstAmount?: number;

  @ApiProperty({ example: 1, description: "Company ID for multi-tenancy" })
  @IsInt()
  companyId: number;

  @ApiProperty({ example: 1, description: "Branch ID" })
  @IsInt()
  branchId: number;

  @ApiProperty({ example: 1, description: "Financial year id" })
  @IsInt()
  financialYearId: number;

  // Optional: add initial consignments in create call
  @ApiPropertyOptional({ example: [1001, 1002], description: "Array of consignment note IDs to attach" })
  @IsOptional()
  @IsArray()
  consignmentIds?: number[];
}
