import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { SearchDestinationDto } from './dto/search-destination.dto';

@Injectable()
export class DestinationService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateDestinationDto) {
    return this.prisma.destination.create({ data: dto });
  }

  search(filters: SearchDestinationDto) {
    return this.prisma.destination.findMany({
      where: {
        isActive: true,
        name: filters.name
          ? { contains: filters.name, mode: 'insensitive' }
          : undefined,
        state: filters.state
          ? { contains: filters.state, mode: 'insensitive' }
          : undefined,
      },
      orderBy: { name: 'asc' },
    });
  }

  findAll() {
    return this.prisma.destination.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const dest = await this.prisma.destination.findUnique({ where: { id } });
    if (!dest) throw new NotFoundException('Destination not found');
    return dest;
  }

  update(id: number, dto: UpdateDestinationDto) {
    return this.prisma.destination.update({
      where: { id },
      data: dto,
    });
  }

  softDelete(id: number) {
    return this.prisma.destination.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
