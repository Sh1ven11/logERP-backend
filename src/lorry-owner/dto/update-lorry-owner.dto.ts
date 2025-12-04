import { PartialType } from '@nestjs/mapped-types';
import { CreateLorryOwnerDto } from './create-lorry-owner.dto';

export class UpdateLorryOwnerDto extends PartialType(CreateLorryOwnerDto) {}
