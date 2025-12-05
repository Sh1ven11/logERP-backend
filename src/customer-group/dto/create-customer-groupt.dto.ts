import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerGroupDto {
  @ApiProperty({
    example: "Jindal Group",
    description: "Name of the customer group",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: "Company ID to which this group belongs",
  })
  @IsNumber()
  companyId: number;
}
