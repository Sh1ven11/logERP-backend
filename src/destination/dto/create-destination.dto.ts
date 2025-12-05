import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDestinationDto {
  @ApiProperty({
    example: "Mumbai",
    description: "Name of the destination/location",
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: "Maharashtra",
    description: "State or region of the destination",
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    example: "400001",
    description: "Pincode of the destination",
  })
  @IsOptional()
  @IsString()
  pincode?: string;
}
