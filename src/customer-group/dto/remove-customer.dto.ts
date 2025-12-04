import { IsInt } from 'class-validator';

export class RemoveCustomerDto {
  @IsInt()
  customerId: number;
}
