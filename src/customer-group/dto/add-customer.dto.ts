import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class AddCustomersDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  customerIds: number[];
}
