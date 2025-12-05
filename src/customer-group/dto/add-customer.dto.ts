import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCustomersDto {
  @ApiProperty({
    example: [1, 2, 5],
    description: "List of customer IDs to be added to the group",
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  customerIds: number[];
}
