import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto, EditCustomerDto } from './dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  // 1. UPDATED: Create customer with auto-generated companyCode
  async create(dto: CreateCustomerDto) {
    // Generate the unique company code based on the company name
    const companyCode = await this.generateUniqueCompanyCode(dto.companyName);

    // Merge the generated code into the data payload
    const dataWithCode = {
        ...dto,
        companyCode,
    };
    
    return this.prisma.customer.create({ data: dataWithCode });
  }

  // NOTE: 'update' method remains unchanged, relying on the frontend to exclude 
  // companyCode from the DTO when updating.
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

  getAll(companyId?: string) {
    // Convert companyId string to number for Prisma's filter, if it exists.
    const whereClause = companyId
      ? { companyId: Number(companyId) } // <-- String to number conversion here
      : {};

    return this.prisma.customer.findMany({
      where: whereClause,
    });
  }

  async search(filters: {
    name?: string;
    group?: string;
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

  // 2. NEW: Helper function to generate and ensure unique company code
  private async generateUniqueCompanyCode(companyName: string): Promise<string> {
    const MAX_ATTEMPTS = 5;
    const baseName = companyName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 3);

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        // Generate a random 4-character suffix
        const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
        
        const candidateCode = `${baseName}-${suffix}`;

        // Check if the code already exists
        const exists = await this.prisma.customer.findUnique({
            where: { companyCode: candidateCode },
            select: { id: true },
        });

        if (!exists) {
            return candidateCode; // Found a unique code
        }
    }

    // If unable to generate a unique code after max attempts
    throw new BadRequestException('Failed to generate a unique company code. Please try again.');
  }
}