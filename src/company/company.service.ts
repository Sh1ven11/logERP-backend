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

  // ⭐ Get all companies a user works for
  async findCompaniesForUser(userId: number) {
    return this.prisma.company.findMany({
      where: {
        users: {
          some: { userId }   // ← matches UserCompany.userId
        }
      },
      include: {
        users: true,         // optional: remove if not needed
      }
    });
  }
  async findBranches(companyId: number) {
    return this.prisma.branch.findMany({
      where: { companyId} ,
    });}
    async findFinancialYears(companyId: number) {
    return this.prisma.financialYear.findMany({
      where: { companyId} ,
    });}
}
