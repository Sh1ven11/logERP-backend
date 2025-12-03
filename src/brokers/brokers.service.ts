import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
@Injectable()
export class BrokersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBrokerDto) {
    return this.prisma.broker.create({ data });
  }

  findAll() {
    return this.prisma.broker.findMany();
  }

  findOne(id: number) {
    return this.prisma.broker.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateBrokerDto) {
    return this.prisma.broker.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.broker.delete({ where: { id } });
  }
}
