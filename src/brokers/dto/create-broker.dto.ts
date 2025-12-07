import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrokerDto {
  @ApiProperty({
    example: "BRK-JDL-001",
    description: "Unique broker code from legacy or internal system",
  })
  @IsString()
  brokerCode: string;

  @ApiProperty({
    example: "Ramesh Transport Broker",
    description: "Full name of the broker",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "Pune Market Yard",
    description: "Address of the broker",
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: "9876543210",
    description: "Broker's phone number",
  })
  @IsString()
  phoneNo: string;

  @ApiPropertyOptional({
    example: "ABCDE1234F",
    description: "Optional PAN card number of broker",
  })
  @IsOptional()
  @IsString()
  panCard?: string;

  @ApiPropertyOptional({
    example: 2,
    description: "TDS percentage for the broker (optional)",
  })
  @IsOptional()
  @IsNumber()
  tdsPercentage?: number;

  @ApiPropertyOptional({
    example: "Regular steel broker for KTPL",
    description: "Additional notes about the broker",
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    example: 1,
    description: "Company ID this broker belongs to",
  })
  @IsInt()
  companyId: number;
}
