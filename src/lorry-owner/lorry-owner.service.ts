import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLorryOwnerDto } from './dto/create-lorry-owner.dto';
import { UpdateLorryOwnerDto } from './dto/update-lorry-owner.dto';

@Injectable()
export class LorryOwnerService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateLorryOwnerDto) {
    return this.prisma.lorryOwner.create({ data: dto });
  }

  findAll(companyId: number) {
    return this.prisma.lorryOwner.findMany({
      where: { companyId },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.lorryOwner.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Lorry owner not found');
    return item;
  }

  update(id: number, dto: UpdateLorryOwnerDto) {
    return this.prisma.lorryOwner.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: number) {
    return this.prisma.lorryOwner.delete({ where: { id } });
  }
}
