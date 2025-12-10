import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    // Ensure date field is handled as a Date object for lookup
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
    // Note: The logic here assumes that companyId, branchId, and financialYearId
    // are mandatory for filtering and are provided as numbers (or undefined if optional in the DTO).
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
    // Added a check to ensure the record exists (good practice)
    const consignment = await this.prisma.consignmentNote.findUnique({ where: { id } });
    if (!consignment) {
        throw new NotFoundException(`Consignment with ID ${id} not found.`);
    }
    return consignment;
  }

  // FIX: Update CN - Corrected typo and ensured date conversion
  async update(id: number, dto: UpdateConsignmentDto) {
    // 1. Check if the record exists before updating
    const existingConsignment = await this.prisma.consignmentNote.findUnique({ where: { id } });
    if (!existingConsignment) {
        throw new NotFoundException(`Consignment with ID ${id} not found.`);
    }

    // 2. Prepare data, converting the date string to a Date object only if it is provided
    const dataToUpdate: any = { ...dto }; // Use 'any' temporarily for easier property manipulation

    if (dto.date) {
        // FIX: Renamed 'ddate' back to 'date' and converted it
        dataToUpdate.date = new Date(dto.date);
    } else {
        // If date is undefined, remove it from the payload entirely if the DTO is not strict
        delete dataToUpdate.date; 
    }
    
    // We must ensure that the user does not try to change the CN number to one that already exists 
    // in the same company and FY, if the CN number is included in the DTO.
    if (dto.cnNumber && dto.cnNumber !== existingConsignment.cnNumber) {
        // Recalculate financialYearId for consistency, although generally not needed on update
        const date = dataToUpdate.date || existingConsignment.date;
        const financialYearId = await this.getFinancialYearId(date, dto.companyId || existingConsignment.companyId);

        const exists = await this.prisma.consignmentNote.findFirst({
            where: {
                cnNumber: dto.cnNumber,
                companyId: dto.companyId || existingConsignment.companyId,
                financialYearId,
                NOT: { id: id } // Exclude the current record itself
            },
        });

        if (exists) {
            throw new BadRequestException("Consignment number already exists in this financial year.");
        }
    }


    return this.prisma.consignmentNote.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  // Delete CN
  async remove(id: number) {
    // Added a check to ensure the record exists before deleting
    const exists = await this.prisma.consignmentNote.findUnique({ where: { id } });
    if (!exists) {
        throw new NotFoundException(`Consignment with ID ${id} not found.`);
    }
    return this.prisma.consignmentNote.delete({ where: { id } });
  }
}