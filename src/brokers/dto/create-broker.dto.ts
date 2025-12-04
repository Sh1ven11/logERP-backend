import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';

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

  @IsInt()
  companyId: number;   // 🔥 REQUIRED for multi-tenant architecture

     // Optional — if brokers may belong to a specific branch
}
