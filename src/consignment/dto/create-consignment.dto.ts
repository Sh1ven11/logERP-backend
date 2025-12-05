import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConsignmentDto {
  @ApiProperty({
    example: "1001",
    description: "Pre-printed consignment note number (unique within company + financial year)",
  })
  @IsString()
  cnNumber: string;

  @ApiProperty({
    example: "2024-04-12",
    description: "Consignment date (ISO format)",
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    example: 1,
    description: "Company to which the consignment belongs",
  })
  @IsNumber()
  companyId: number;

  @ApiProperty({
    example: 2,
    description: "Branch handling this consignment",
  })
  @IsNumber()
  branchId: number;

  @ApiProperty({
    example: 5,
    description: "Customer ID of consignor (sender)",
  })
  @IsNumber()
  consignorId: number;

  @ApiProperty({
    example: 6,
    description: "Customer ID of consignee (receiver)",
  })
  @IsNumber()
  consigneeId: number;

  @ApiProperty({
    example: 3,
    description: "Origin destination ID",
  })
  @IsNumber()
  fromDestinationId: number;

  @ApiProperty({
    example: 4,
    description: "Destination ID where goods are delivered",
  })
  @IsNumber()
  toDestinationId: number;

  @ApiProperty({
    example: 12,
    description: "Number of packages",
  })
  @IsNumber()
  packages: number;

  @ApiProperty({
    example: "bags",
    description: "Unit of measurement for packages (e.g., bags, lot, set)",
  })
  @IsString()
  packageUom: string;

  @ApiProperty({
    example: "Steel rods (Grade A)",
    description: "Description of goods being consigned",
  })
  @IsString()
  contents: string;

  @ApiPropertyOptional({
    example: "Destination",
    description: "GST payable at (Origin / Destination)",
  })
  @IsOptional()
  @IsString()
  gstPayableAt?: string;

  @ApiPropertyOptional({
    example: 950,
    description: "Net weight of goods",
  })
  @IsOptional()
  @IsNumber()
  netWeight?: number;

  @ApiPropertyOptional({
    example: 1000,
    description: "Gross weight of goods",
  })
  @IsOptional()
  @IsNumber()
  grossWeight?: number;

  @ApiPropertyOptional({
    example: 980,
    description: "Chargeable weight",
  })
  @IsOptional()
  @IsNumber()
  chargeWeight?: number;

  @ApiProperty({
    example: "mt",
    description: "Weight UOM (e.g., mt, fixed)",
  })
  @IsString()
  weightUom: string;

  @ApiPropertyOptional({
    example: 150,
    description: "Rate value based on rateOn",
  })
  @IsOptional()
  @IsNumber()
  rate?: number;

  @ApiPropertyOptional({
    example: "mt",
    description: "Rate is applied on (e.g., mt, fixed)",
  })
  @IsOptional()
  @IsString()
  rateOn?: string;

  @ApiPropertyOptional({
    example: 147000,
    description: "Freight charges computed for this consignment",
  })
  @IsOptional()
  @IsNumber()
  freightCharges?: number;

  @ApiPropertyOptional({
    example: "MH12AB1234",
    description: "Vehicle number used for transport",
  })
  @IsOptional()
  @IsString()
  vehicleNo?: string;

  @ApiPropertyOptional({
    example: "Ramesh Kumar",
    description: "Driver name",
  })
  @IsOptional()
  @IsString()
  driverName?: string;

  @ApiPropertyOptional({
    example: "Handle with care",
    description: "Additional remarks or instructions",
  })
  @IsOptional()
  @IsString()
  remarks?: string;

  @ApiPropertyOptional({
    example: 7,
    description: "Broker ID involved in this consignment",
  })
  @IsOptional()
  @IsNumber()
  brokerId?: number;
}
