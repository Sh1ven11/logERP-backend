import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class AddConsignmentsDto {
  @ApiProperty({ example: [1,2,3], description: "List of consignment note IDs to attach to challan" })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  consignmentIds: number[];
}
