import { IsOptional, IsString } from 'class-validator';

export class UpdateCustomerGroupDto {
  @IsOptional()
  @IsString()
  name?: string;
}
