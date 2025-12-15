import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsInt,
  IsArray,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLorryHireDto {
  // -------------------------
  // CORE
  // -------------------------

  @ApiProperty({ example: "LHC-2024-0001" })
  @IsString()
  challanNumber: string;

  @ApiProperty({ example: "2024-05-10" })
  @IsDateString()
  challanDate: string;

  @ApiPropertyOptional({ example: "2024-05-11" })
  @IsOptional()
  @IsDateString()
  lorryHireDate?: string;

  // -------------------------
  // VEHICLE & DRIVER
  // -------------------------

  @ApiProperty({ example: "MH12AB1234" })
  @IsString()
  vehicleNo: string;

  @ApiPropertyOptional({ example: "Ramesh Kumar" })
  @IsOptional()
  @IsString()
  driverName?: string;

  @ApiPropertyOptional({ example: "MH2020123456789" })
  @IsOptional()
  @IsString()
  driverLicenseNo?: string;

  @ApiPropertyOptional({ example: "Urgent delivery" })
  @IsOptional()
  @IsString()
  remarks?: string;

  // -------------------------
  // PARTIES
  // -------------------------

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  lorryOwnerId: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  brokerId?: number;

  // -------------------------
  // TDS
  // -------------------------

  @ApiPropertyOptional({ example: "ABCDE1234F" })
  @IsOptional()
  @IsString()
  panCardUsed?: string;

  @ApiPropertyOptional({
    example: "lorryOwner",
    enum: ['yes', 'no', 'broker', 'lorryOwner'],
  })
  @IsOptional()
  @IsIn(['yes', 'no', 'broker', 'lorryOwner'])
  tdsApplicable?: 'yes' | 'no' | 'broker' | 'lorryOwner';

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tdsPercent?: number;

  // -------------------------
  // TRIP
  // -------------------------

  @ApiProperty({ example: 1 })
  @IsInt()
@Type(() => Number)
  destinationId: number;

  // -------------------------
  // AMOUNTS
  // -------------------------

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  totalPackages?: number;

  @ApiPropertyOptional({ example: 980 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalWeight?: number;

  @ApiPropertyOptional({ example: 150 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rate?: number;

  @ApiPropertyOptional({ example: 147000 })
  @IsOptional()
  @IsNumber()
  lorryHire?: number;

  @ApiPropertyOptional({ example: 20000 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  advancePaid?: number;

  @ApiPropertyOptional({ example: 500 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  loadingCharges?: number;

  @ApiPropertyOptional({ example: 300 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  unloadingCharges?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  dieselAdvance?: number;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  gstApplicable?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  gstAmount?: number;

  // -------------------------
  // ORG
  // -------------------------

  @ApiProperty({ example: 1 })
  @IsInt()
@Type(() => Number)
  companyId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
@Type(() => Number)
  branchId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
@Type(() => Number)

  financialYearId: number;

  // -------------------------
  // CONSIGNMENTS
  // -------------------------

  @ApiPropertyOptional({
    example: [1, 2],
    description: "Consignment IDs to attach",
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  consignmentIds?: number[];
}
