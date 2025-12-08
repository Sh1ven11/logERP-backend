import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CustomerGroupService } from './customer-group.service';
import { CreateCustomerGroupDto } from './dto/create-customer-groupt.dto';
import { UpdateCustomerGroupDto } from './dto/update-customer-group.dto';
import { AddCustomersDto } from './dto/add-customer.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guard';

@UseGuards(JwtGuard)

@Controller('customer-groups')
export class CustomerGroupController {
  constructor(private readonly service: CustomerGroupService) {}

  // CREATE GROUP
  @Post()
  create(@Body() dto: CreateCustomerGroupDto) {
    return this.service.create(dto);
  }

  // GET ALL GROUPS FOR A COMPANY
  @Get()
  findAll(@Query('companyId', ParseIntPipe) companyId: number) {
    return this.service.findAll(companyId);
  }

  // GET CUSTOMERS IN A GROUP
  @Get(':groupId/customers')
  findCustomers(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.service.findCustomers(groupId);
  }

  // UPDATE GROUP
  @Patch(':groupId')
  update(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() dto: UpdateCustomerGroupDto,
  ) {
    return this.service.update(groupId, dto);
  }

  // DELETE GROUP
  @Delete(':groupId')
  remove(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.service.remove(groupId);
  }

  // ADD CUSTOMERS TO GROUP
  @Patch(':groupId/add-customers')
  addCustomers(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() dto: AddCustomersDto,
  ) {
    return this.service.addCustomers(groupId, dto);
  }

  // REMOVE ONE CUSTOMER
  @Patch(':groupId/remove-customer/:customerId')
  removeCustomer(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('customerId', ParseIntPipe) customerId: number,
  ) {
    return this.service.removeCustomerFromGroup(groupId, customerId);
  }
}
