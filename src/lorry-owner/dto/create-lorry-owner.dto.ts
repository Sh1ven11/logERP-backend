import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateLorryOwnerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address1?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address3?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  panNumber?: string;

  @ApiProperty()
  @IsNumber()
  companyId: number;
}
