import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  companyId: number;
}
