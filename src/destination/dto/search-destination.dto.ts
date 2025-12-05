import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchDestinationDto {
  @ApiPropertyOptional({
    example: "Mumbai",
    description: "Filter destinations by name (case-insensitive)",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: "Maharashtra",
    description: "Filter destinations by state",
  })
  @IsOptional()
  @IsString()
  state?: string;
}
