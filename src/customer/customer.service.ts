import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto,EditCustomerDto } from './dto';
@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCustomerDto) {
    return this.prisma.customer.create({ data: dto });
  }

  async update(id: number, dto: EditCustomerDto) {
    const exists = await this.prisma.customer.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Customer not found');

    return this.prisma.customer.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    const exists = await this.prisma.customer.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Customer not found');

    return this.prisma.customer.delete({ where: { id } });
  }

  getAll() {
    return this.prisma.customer.findMany();
  }

  async search(filters: {
    name?: string;
    group?: string;   // groupName
    code?: string;
    query?: string;
  }) {
        const { name, group, code, query } = filters;

        return this.prisma.customer.findMany({
          where: {
            AND: [
              // Search by companyName
              name
                ? { companyName: { contains: name, mode: 'insensitive' } }
                : {},

              // Search by group name (fixed)
              group
                ? {
                    group: {
                      name: { contains: group, mode: 'insensitive' },
                    },
                  }
                : {},

              // Search by companyCode
              code
                ? { companyCode: { contains: code, mode: 'insensitive' } }
                : {},

              // Global search (fixed)
              query
                ? {
                    OR: [
                      { companyName: { contains: query, mode: 'insensitive' } },

                      {
                        group: {
                          name: { contains: query, mode: 'insensitive' },
                        },
                      },

                      { companyCode: { contains: query, mode: 'insensitive' } },
                    ],
                  }
                : {},
            ],
          },
        });
  }


}
