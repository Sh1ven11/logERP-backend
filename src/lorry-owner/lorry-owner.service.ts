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
  async findByName(companyId: number, query: string) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  return this.prisma.lorryOwner.findMany({
    where: {
      companyId,
      name: {
        contains: query,
        mode: 'insensitive', // VERY IMPORTANT
      },
    },
    orderBy: {
      name: 'asc',
    },
    take: 20, // limit for autocomplete
  });
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
