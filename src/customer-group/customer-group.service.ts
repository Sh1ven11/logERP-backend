import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerGroupDto } from './dto/create-customer-groupt.dto';
import { UpdateCustomerGroupDto } from './dto/update-customer-group.dto';
import { AddCustomersDto } from './dto/add-customer.dto';

@Injectable()
export class CustomerGroupService {
  constructor(private prisma: PrismaService) {}

  // CREATE GROUP
  create(dto: CreateCustomerGroupDto) {
    return this.prisma.customerGroup.create({
      data: {
        name: dto.name,
        companyId: dto.companyId,
      },
    });
  }

  // GET ALL GROUPS FOR A COMPANY
  findAll(companyId: number) {
    return this.prisma.customerGroup.findMany({
      where: { companyId },
    });
  }

  // GET customers in a group
  findCustomers(groupId: number) {
    return this.prisma.customer.findMany({
      where: { groupId },
    });
  }

  // UPDATE GROUP
  update(groupId: number, dto: UpdateCustomerGroupDto) {
    return this.prisma.customerGroup.update({
      where: { id: groupId },
      data: dto,
    });
  }

  // DELETE GROUP
  async remove(groupId: number) {
    // Optional: ensure group exists
    const exists = await this.prisma.customerGroup.findUnique({
      where: { id: groupId },
    });

    if (!exists) throw new NotFoundException('Group not found');

    // Set groupId = null for all customers in this group
    await this.prisma.customer.updateMany({
      where: { groupId },
      data: { groupId: null },
    });

    return this.prisma.customerGroup.delete({
      where: { id: groupId },
    });
  }

  // ADD CUSTOMERS TO GROUP
  addCustomers(groupId: number, dto: AddCustomersDto) {
    return this.prisma.customer.updateMany({
      where: { id: { in: dto.customerIds } },
      data: { groupId },
    });
  }

  // REMOVE ONE CUSTOMER FROM GROUP
  removeCustomerFromGroup(groupId: number, customerId: number) {
    return this.prisma.customer.update({
      where: { id: customerId },
      data: { groupId: null },
    });
  }
}
