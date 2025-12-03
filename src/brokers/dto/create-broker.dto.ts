import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateBrokerDto {
  @IsString()
  brokerCode: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phoneNo: string;

  @IsOptional()
  @IsString()
  panCard?: string;

  @IsOptional()
  @IsNumber()
  tdsPercentage?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
