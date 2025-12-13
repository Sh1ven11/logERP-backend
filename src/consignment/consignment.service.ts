import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    // 1. Validate financialYearId belongs to the company
    const fy = await this.prisma.financialYear.findFirst({
      where: {
        id: dto.financialYearId,
        companyId: dto.companyId,
      },
    });

    if (!fy) {
      throw new BadRequestException("Invalid financial year for this company");
    }

    // 2. Ensure CN number is unique in company + FY
    const duplicate = await this.prisma.consignmentNote.findFirst({
      where: {
        cnNumber: dto.cnNumber,
        companyId: dto.companyId,
        financialYearId: dto.financialYearId,
      },
    });

    if (duplicate) {
      throw new BadRequestException(
        "Consignment number already exists in this financial year"
      );
    }

    // 3. Create CN
    return this.prisma.consignmentNote.create({
      data: {
        ...dto,
        date: new Date(dto.date),
        createdByUserId: userId,
      },
    });
  }


  // -------------------------------------------------------------------------
  // LIST ALL (company + FY)
  // -------------------------------------------------------------------------
  async findAll(companyId: number, financialYearId: number) {
    return this.prisma.consignmentNote.findMany({
      where: { companyId, financialYearId },
      orderBy: { date: 'desc' },
      include: {
        consignor: { select: { id: true, companyName: true } },
        consignee: { select: { id: true, companyName: true } },
        fromDestination: { select: { id: true, name: true } },
        toDestination: { select: { id: true, name: true } },
        broker: { select: { id: true, name: true } },
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
          ? { contains: filters.cnNumber, mode: "insensitive" }
          : undefined,

        vehicleNo: filters.vehicleNo
          ? { contains: filters.vehicleNo, mode: "insensitive" }
          : undefined,

        consignorId: filters.consignorId || undefined,
        consigneeId: filters.consigneeId || undefined,
        companyId: filters.companyId || undefined,
        branchId: filters.branchId || undefined,
        financialYearId: filters.financialYearId || undefined,
      },

      orderBy: { date: "desc" },

      include: {
        consignor: { select: { id: true, companyName: true } },
        consignee: { select: { id: true, companyName: true } },
        fromDestination: { select: { id: true, name: true } },
        toDestination: { select: { id: true, name: true } },
        broker: { select: { id: true, name: true } },
      },
    });
  }


  // -------------------------------------------------------------------------
  // FIND ONE (for edit page)
  // -------------------------------------------------------------------------
  async findOne(id: number) {
  const consignment = await this.prisma.consignmentNote.findUnique({
    where: { id },
    include: {
      consignor: { select: { id: true, companyName: true } },
      consignee: { select: { id: true, companyName: true } },
      fromDestination: { select: { id: true, name: true } },
      toDestination: { select: { id: true, name: true } },
      broker: { select: { id: true, name: true } },
    }
  });

  if (!consignment) {
    throw new NotFoundException(`Consignment with ID ${id} not found.`);
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
      throw new NotFoundException(`Consignment with ID ${id} not found.`);
    }

    // prepare update payload
    const dataToUpdate: any = { ...dto };

    if (dto.date) {
      dataToUpdate.date = new Date(dto.date);
    }

    // Prevent duplicate CN number (ONLY if CN number changed)
    if (dto.cnNumber && dto.cnNumber !== existing.cnNumber) {
      const duplicate = await this.prisma.consignmentNote.findFirst({
        where: {
          cnNumber: dto.cnNumber,
          companyId: dto.companyId ?? existing.companyId,
          financialYearId: dto.financialYearId ?? existing.financialYearId,
          NOT: { id }, // exclude current CN
        },
      });

      if (duplicate) {
        throw new BadRequestException(
          "Consignment number already exists in this financial year."
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
      throw new NotFoundException(`Consignment with ID ${id} not found.`);
    }

    return this.prisma.consignmentNote.delete({
      where: { id },
    });
  }
}
