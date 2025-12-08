import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInvoiceDto) {
    // Auto increment invoice number per company + financial year
    const lastInvoice = await this.prisma.invoice.findFirst({
      where: { companyId: dto.companyId },
      orderBy: { invoiceNo: "desc" },
    });

    const nextInvoiceNo = lastInvoice ? lastInvoice.invoiceNo + 1 : 1;

    return this.prisma.invoice.create({
      data: {
        invoiceNo: nextInvoiceNo,
        invoiceDate: new Date(dto.invoiceDate),

        companyId: dto.companyId,
        branchId: dto.branchId,
        customerId: dto.customerId,

        billAmount: dto.billAmount,
        deduction: dto.deduction,
        tdsDeducted: dto.tdsDeducted,
        creditDays: dto.creditDays,

        stagingChargeRate: dto.stagingChargeRate,
        stagingChargeAmount: dto.stagingChargeAmount,
        csRate: dto.csRate,

        insurance: dto.insurance,
        otherCharges: dto.otherCharges,
        gstPercent: dto.gstPercent,

        remarks: dto.remarks,
        notes: dto.notes,

        consignments: {
          create: dto.consignmentIds.map((id) => ({
            consignmentId: id,
          })),
        },
      },
      include: { consignments: true },
    });
  }

  findAll() {
    return this.prisma.invoice.findMany({
      include: { consignments: true },
    });
  }

  findOne(id: number) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: { consignments: true },
    });
  }
}
