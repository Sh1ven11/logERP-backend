import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateLorryOwnerDto {
  @ApiProperty({
    example: "Ramesh Transport Co.",
    description: "Full legal name of the lorry owner / transport agency",
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: "Plot No. 12",
    description: "Address line 1",
  })
  @IsOptional()
  @IsString()
  address1?: string;

  @ApiPropertyOptional({
    example: "Transport Nagar",
    description: "Address line 2",
  })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiPropertyOptional({
    example: "Navi Mumbai",
    description: "Address line 3",
  })
  @IsOptional()
  @IsString()
  address3?: string;

  @ApiPropertyOptional({
    example: "ABCDE1234F",
    description: "PAN number of the lorry owner (optional)",
  })
  @IsOptional()
  @IsString()
  panNumber?: string;

  @ApiProperty({
    example: 1,
    description: "Company ID to which this lorry owner belongs",
  })
  @IsNumber()
  companyId: number;
}
