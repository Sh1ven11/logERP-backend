import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConsignmentDto } from './dto/create-consignment.dto';
import { UpdateConsignmentDto } from './dto/update-consignment.dto';
import { SearchConsignmentDto } from './dto/search-consignment.dto';

@Injectable()
export class ConsignmentService {
  constructor(private prisma: PrismaService) {}

  // Get FY based on date + company
  async getFinancialYearId(date: Date, companyId: number) {
    const fy = await this.prisma.financialYear.findFirst({
      where: {
        companyId,
        startDate: { lte: date },
        endDate: { gte: date },
      },
    });

    if (!fy) throw new BadRequestException("Financial year not defined for this date");

    return fy.id;
  }

  // Create CN
  async create(dto: CreateConsignmentDto, userId: number) {
    const date = new Date(dto.date);
    const financialYearId = await this.getFinancialYearId(date, dto.companyId);

    // ensure CN number unique within company + FY
    const exists = await this.prisma.consignmentNote.findFirst({
      where: {
        cnNumber: dto.cnNumber,
        companyId: dto.companyId,
        financialYearId,
      },
    });

    if (exists) {
      throw new BadRequestException("Consignment number already exists in this financial year");
    }

    return this.prisma.consignmentNote.create({
      data: {
        ...dto,
        date,
        financialYearId,
        createdByUserId: userId,
      },
    });
  }

  // Get all CN by company + FY
  async findAll(companyId: number, financialYearId: number) {
    return this.prisma.consignmentNote.findMany({
      where: { companyId, financialYearId },
      orderBy: { date: 'desc' },
    });
  }

  // Search CNs
  async search(filters: SearchConsignmentDto) {
    return this.prisma.consignmentNote.findMany({
      where: {
        cnNumber: filters.cnNumber ? { contains: filters.cnNumber, mode: 'insensitive' } : undefined,
        vehicleNo: filters.vehicleNo ? { contains: filters.vehicleNo, mode: 'insensitive' } : undefined,
        consignorId: filters.consignorId || undefined,
        consigneeId: filters.consigneeId || undefined,
        companyId: filters.companyId || undefined,
        branchId: filters.branchId || undefined,
        financialYearId: filters.financialYearId || undefined,
      },
      orderBy: { date: 'desc' },
    });
  }

  // One CN
  async findOne(id: number) {
    return this.prisma.consignmentNote.findUnique({ where: { id } });
  }

  // Update CN
  async update(id: number, dto: UpdateConsignmentDto) {
    return this.prisma.consignmentNote.update({
      where: { id },
      data: dto,
    });
  }

  // Delete CN
  async remove(id: number) {
    return this.prisma.consignmentNote.delete({ where: { id } });
  }
}
