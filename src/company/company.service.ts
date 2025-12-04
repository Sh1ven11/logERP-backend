import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(data) {
    return this.prisma.company.create({ data });
  }

  findAll() {
    return this.prisma.company.findMany({
      include: { branches: true }
    });
  }

  findOne(id: number) {
    return this.prisma.company.findUnique({
      where: { id },
      include: { branches: true },
    });
  }
}
