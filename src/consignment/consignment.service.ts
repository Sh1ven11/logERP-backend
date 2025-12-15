import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConsignmentDto } from './dto/create-consignment.dto';
import { UpdateConsignmentDto } from './dto/update-consignment.dto';
import { SearchConsignmentDto } from './dto/search-consignment.dto';

@Injectable()
export class ConsignmentService {
  constructor(private prisma: PrismaService) {}

  // -------------------------------------------------------------------------
  // CREATE
  // -------------------------------------------------------------------------
  async create(dto: CreateConsignmentDto, userId: number) {
    // 1️⃣ Validate financial year belongs to company
    const fy = await this.prisma.financialYear.findFirst({
      where: {
        id: dto.financialYearId,
        companyId: dto.companyId,
      },
    });

    if (!fy) {
      throw new BadRequestException(
        'Invalid financial year for this company',
      );
    }

    // 2️⃣ Validate billedToId (must be consignor or consignee)
    if (
      dto.billedToId !== dto.consignorId &&
      dto.billedToId !== dto.consigneeId
    ) {
      throw new BadRequestException(
        'Billed To must be either Consignor or Consignee',
      );
    }

    // 3️⃣ Ensure CN number is unique within company + FY
    const duplicate = await this.prisma.consignmentNote.findFirst({
      where: {
        cnNumber: dto.cnNumber,
        companyId: dto.companyId,
        financialYearId: dto.financialYearId,
      },
    });

    if (duplicate) {
      throw new BadRequestException(
        'Consignment number already exists in this financial year',
      );
    }

    // 4️⃣ Create consignment
    return this.prisma.consignmentNote.create({
      data: {
        ...dto,
        date: new Date(dto.date),
        createdByUserId: userId,
      },
    });
  }

  // -------------------------------------------------------------------------
  // LIST ALL (Company + Financial Year)
  // -------------------------------------------------------------------------
  async findAll(companyId: number, financialYearId: number) {
    return this.prisma.consignmentNote.findMany({
      where: { companyId, financialYearId },
      orderBy: { date: 'desc' },
      include: {
        consignor: { select: { id: true, companyName: true } },
        consignee: { select: { id: true, companyName: true } },
        billedTo: { select: { id: true, companyName: true } },
        fromDestination: { select: { id: true, name: true } },
        toDestination: { select: { id: true, name: true } },
      },
    });
  }

  // -------------------------------------------------------------------------
  // SEARCH
  // -------------------------------------------------------------------------
  async search(filters: SearchConsignmentDto) {
    return this.prisma.consignmentNote.findMany({
      where: {
        cnNumber: filters.cnNumber
          ? { contains: filters.cnNumber, mode: 'insensitive' }
          : undefined,

        consignorId: filters.consignorId,
        consigneeId: filters.consigneeId,
        billedToId: filters.billedToId,

        companyId: filters.companyId,
        branchId: filters.branchId,
        financialYearId: filters.financialYearId,

        // 📅 Date range filter
        date:
          filters.fromDate && filters.toDate
            ? {
                gte: new Date(filters.fromDate),
                lte: new Date(filters.toDate),
              }
            : undefined,
      },

      orderBy: { date: 'desc' },

      include: {
        consignor: { select: { id: true, companyName: true } },
        consignee: { select: { id: true, companyName: true } },
        billedTo: { select: { id: true, companyName: true } },
        fromDestination: { select: { id: true, name: true } },
        toDestination: { select: { id: true, name: true } },
      },
    });
  }

  // -------------------------------------------------------------------------
  // FIND ONE (Edit / View)
  // -------------------------------------------------------------------------
  async findOne(id: number) {
    const consignment = await this.prisma.consignmentNote.findUnique({
      where: { id },
      include: {
        consignor: { select: { id: true, companyName: true } },
        consignee: { select: { id: true, companyName: true } },
        billedTo: { select: { id: true, companyName: true } },
        fromDestination: { select: { id: true, name: true } },
        toDestination: { select: { id: true, name: true } },
      },
    });

    if (!consignment) {
      throw new NotFoundException(
        `Consignment with ID ${id} not found`,
      );
    }

    return consignment;
  }

  // -------------------------------------------------------------------------
  // UPDATE
  // -------------------------------------------------------------------------
  async update(id: number, dto: UpdateConsignmentDto) {
    const existing = await this.prisma.consignmentNote.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(
        `Consignment with ID ${id} not found`,
      );
    }

    // 1️⃣ Validate billedToId if changed
    if (
      dto.billedToId &&
      dto.billedToId !== existing.consignorId &&
      dto.billedToId !== existing.consigneeId
    ) {
      throw new BadRequestException(
        'Billed To must be either Consignor or Consignee',
      );
    }

    const dataToUpdate: any = { ...dto };

    if (dto.date) {
      dataToUpdate.date = new Date(dto.date);
    }

    // 2️⃣ Prevent CN number duplication
    if (dto.cnNumber && dto.cnNumber !== existing.cnNumber) {
      const duplicate = await this.prisma.consignmentNote.findFirst({
        where: {
          cnNumber: dto.cnNumber,
          companyId: dto.companyId ?? existing.companyId,
          financialYearId:
            dto.financialYearId ?? existing.financialYearId,
          NOT: { id },
        },
      });

      if (duplicate) {
        throw new BadRequestException(
          'Consignment number already exists in this financial year',
        );
      }
    }

    return this.prisma.consignmentNote.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  // -------------------------------------------------------------------------
  // DELETE
  // -------------------------------------------------------------------------
  async remove(id: number) {
    const exists = await this.prisma.consignmentNote.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(
        `Consignment with ID ${id} not found`,
      );
    }

    // ⛔ Future safeguard (recommended):
    // prevent delete if invoiced or linked to challan

    return this.prisma.consignmentNote.delete({
      where: { id },
    });
  }
}
