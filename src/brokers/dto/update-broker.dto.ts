import { PartialType } from '@nestjs/mapped-types';
import { CreateBrokerDto } from './create-broker.dto';

export class UpdateBrokerDto extends PartialType(CreateBrokerDto) {}
