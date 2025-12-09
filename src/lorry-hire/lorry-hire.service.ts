import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLorryHireDto } from './dto/create-lorry-hire.dto';
import { UpdateLorryHireDto } from './dto/update-lorry-hire.dto';
import { AddConsignmentsDto } from './dto/add-consignments.dto';

@Injectable()
export class LorryHireService {
  constructor(private prisma: PrismaService) {}

  // helper: compute totals from consignments (packages + chargeWeight)
  private async computeTotalsForConsignments(consignmentIds: number[]) {
    const consignments = await this.prisma.consignmentNote.findMany({
      where: { id: { in: consignmentIds } },
      select: {
        packages: true,
        chargeWeight: true,
      },
    });

    if (consignments.length !== consignmentIds.length) {
      throw new BadRequestException('One or more consignments not found');
    }

    const totalPackages = consignments.reduce((s, c) => s + (c.packages || 0), 0);
    const totalWeight = consignments.reduce((s, c) => s + (c.chargeWeight || 0), 0);
    return { totalPackages, totalWeight };
  }

  // Create challan; optionally attach consignmentIds
  async create(dto: CreateLorryHireDto, userId: number) {
    // If consignmentIds provided, validate and compute totals
    let totals = { totalPackages: dto.totalPackages || 0, totalWeight: dto.totalWeight || 0 };
    if (dto.consignmentIds && dto.consignmentIds.length) {
      totals = await this.computeTotalsForConsignments(dto.consignmentIds);
    }

    // compute tds amount if applicable
    const tdsAmount = dto.tdsApplicable && dto.tdsPercent && dto.lorryHire
      ? (dto.lorryHire * dto.tdsPercent) / 100
      : 0;

    const balance = (dto.lorryHire || 0) - (dto.advancePaid || 0) - (tdsAmount || 0)
      - (dto.loadingCharges || 0) - (dto.unloadingCharges || 0) - (dto.dieselAdvance || 0)
      + (dto.gstApplicable ? (dto.gstAmount || 0) : 0);

    const created = await this.prisma.lorryHireChallan.create({
      data: {
        challanNumber: dto.challanNumber,
        challanDate: new Date(dto.challanDate),
        lorryHireDate: dto.lorryHireDate ? new Date(dto.lorryHireDate) : undefined,
        vehicleNo: dto.vehicleNo,
        slipNo: dto.slipNo,
        remarks: dto.remarks,
        lorryOwnerId: dto.lorryOwnerId,
        brokerId: dto.brokerId,
        panCardUsed: dto.panCardUsed,
        tdsApplicable: dto.tdsApplicable ?? false,
        tdsPercent: dto.tdsPercent ?? undefined,
        destinationId: dto.destinationId,
        totalPackages: totals.totalPackages,
        totalWeight: totals.totalWeight,
        rate: dto.rate ?? undefined,
        lorryHire: dto.lorryHire ?? undefined,
        advancePaid: dto.advancePaid ?? 0,
        balancePayable: balance,
        loadingCharges: dto.loadingCharges ?? 0,
        unloadingCharges: dto.unloadingCharges ?? 0,
        dieselAdvance: dto.dieselAdvance ?? 0,
        gstApplicable: dto.gstApplicable ?? false,
        gstAmount: dto.gstAmount ?? 0,
        companyId: dto.companyId,
        branchId: dto.branchId,
        financialYearId: dto.financialYearId,
        consignmentCount: dto.consignmentIds?.length ?? 0,
        createdByUserId: userId,
      },
    });

    // Attach consignments if provided
    if (dto.consignmentIds && dto.consignmentIds.length) {
      const relCreates = dto.consignmentIds.map(cid => ({
        challanId: created.id,
        consignmentId: cid,
      }));
      await this.prisma.lorryHireChallanConsignment.createMany({
        data: relCreates,
        skipDuplicates: true,
      });
    }

    return this.findOne(created.id);
  }

  // add consignments later
  async addConsignments(challanId: number, dto: AddConsignmentsDto) {
    const challan = await this.prisma.lorryHireChallan.findUnique({ where: { id: challanId } });
    if (!challan) throw new NotFoundException('Challan not found');

    // create many relations
    const data = dto.consignmentIds.map(cid => ({ challanId, consignmentId: cid }));
    await this.prisma.lorryHireChallanConsignment.createMany({ data, skipDuplicates: true });

    // recompute totals & consignmentCount
    const relations = await this.prisma.lorryHireChallanConsignment.findMany({
      where: { challanId },
      select: { consignmentId: true },
    });
    const consignmentIds = relations.map(r => r.consignmentId);
    const totals = await this.computeTotalsForConsignments(consignmentIds);

    // update challan totals
    await this.prisma.lorryHireChallan.update({
      where: { id: challanId },
      data: {
        totalPackages: totals.totalPackages,
        totalWeight: totals.totalWeight,
        consignmentCount: consignmentIds.length,
      },
    });

    return this.findOne(challanId);
  }

  // remove a consignment
  async removeConsignment(challanId: number, consignmentId: number) {
    await this.prisma.lorryHireChallanConsignment.deleteMany({
      where: { challanId, consignmentId },
    });

    // recompute after removal
    const relations = await this.prisma.lorryHireChallanConsignment.findMany({
      where: { challanId },
      select: { consignmentId: true },
    });
    const consignmentIds = relations.map(r => r.consignmentId);
    const totals = consignmentIds.length ? await this.computeTotalsForConsignments(consignmentIds) : { totalPackages: 0, totalWeight: 0 };

    await this.prisma.lorryHireChallan.update({
      where: { id: challanId },
      data: {
        totalPackages: totals.totalPackages,
        totalWeight: totals.totalWeight,
        consignmentCount: consignmentIds.length,
      },
    });

    return this.findOne(challanId);
  }

  // fetch one with relations
  async findOne(id: number) {
    return this.prisma.lorryHireChallan.findUnique({
      where: { id },
      include: {
        consignments: { include: { consignment: true } },
        lorryOwner: true,
        broker: true,
        destination: true,
        company: true,
        branch: true,
        createdBy: true,
      },
    });
  }

  // list / search
  async findAll(filters: any = {}) {
    const where: any = {};
    if (filters.companyId) where.companyId = filters.companyId;
    if (filters.branchId) where.branchId = filters.branchId;
    if (filters.financialYearId) where.financialYearId = filters.financialYearId;
    if (filters.lorryOwnerId) where.lorryOwnerId = filters.lorryOwnerId;
    if (filters.challanNumber) where.challanNumber = { contains: filters.challanNumber, mode: 'insensitive' };
    if (typeof filters.isSettled !== 'undefined') where.isSettled = filters.isSettled;

    return this.prisma.lorryHireChallan.findMany({
      where,
      orderBy: { challanDate: 'desc' },
      include: { lorryOwner: true, broker: true, destination: true },
    });
  }
  // /Users/shivengupta/Desktop/ERP/erp-backend/src/lorry-hire/lorry-hire.service.ts

// /Users/shivengupta/Desktop/ERP/erp-backend/src/lorry-hire/lorry-hire.service.ts

// ... (Other imports and class definition)

async update(id: number, dto: UpdateLorryHireDto) {
  const data: any = { ...dto };
  
  // 1. Existing date handling logic
  if (dto.isSettled && !dto.paymentDate) {
    data.paymentDate = new Date();
  }
  if (dto.challanDate) data.challanDate = new Date(dto.challanDate as any);
  if (dto.lorryHireDate) data.lorryHireDate = new Date(dto.lorryHireDate as any);

  // --- 2. PRISMA RELATIONSHIP FIXES ---

  // A. Fix for single relation IDs (one-to-one/one-to-many foreign keys)
  const singleRelationFields = [
    { idKey: 'lorryOwnerId', relationKey: 'lorryOwner' },
    { idKey: 'brokerId', relationKey: 'broker' },
    { idKey: 'destinationId', relationKey: 'destination' },
    { idKey: 'companyId', relationKey: 'company' },
    { idKey: 'branchId', relationKey: 'branch' },
    { idKey: 'financialYearId', relationKey: 'financialYear' },
    // Add other single relation ID fields here if they exist
  ];

  singleRelationFields.forEach(({ idKey, relationKey }) => {
    if (data[idKey]) {
      // Transform ID into { connect: { id: ID } }
      data[relationKey] = {
        connect: {
          id: data[idKey],
        },
      };
      delete data[idKey];
    }
  });

  // B. Fix for array relation IDs (many-to-many relationship)
  // FIX for: Unknown argument `consignmentIds`. Did you mean `consignments`?
  if (data.consignmentIds && Array.isArray(data.consignmentIds)) {
      // The 'set' operation requires an array of objects: [{ id: ID }, { id: ID }, ...]
      const consignmentConnects = data.consignmentIds.map((id: number) => ({ id }));

      // Use the relation field 'consignments' with the 'set' operation
      data.consignments = { 
          set: consignmentConnects 
      };

      // Remove the simple ID array field
      delete data.consignmentIds;
  }

  // --- END PRISMA RELATIONSHIP FIXES ---

  // 3. Execute the update call
  await this.prisma.lorryHireChallan.update({ where: { id }, data });
  return this.findOne(id);
}
  // mark as settled explicitly
  async settle(id: number, paymentDate?: string) {
    const pd = paymentDate ? new Date(paymentDate) : new Date();
    await this.prisma.lorryHireChallan.update({
      where: { id },
      data: { isSettled: true, paymentDate: pd },
    });
    return this.findOne(id);
  }

  // delete challan (and relations)
  async remove(id: number) {
    await this.prisma.lorryHireChallanConsignment.deleteMany({ where: { challanId: id } });
    return this.prisma.lorryHireChallan.delete({ where: { id } });
  }
}
