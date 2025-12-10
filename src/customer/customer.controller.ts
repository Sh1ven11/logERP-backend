import { Controller, Post, Body, Get, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { EditCustomerDto } from './dto/edit-customer.dto';
import { Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guard';
@UseGuards(JwtGuard)
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  addCustomer(@Body() dto: CreateCustomerDto) {
    return this.customerService.create(dto);
  }

  @Patch(':id')
  updateCustomer(@Param('id') id: string, @Body() dto: EditCustomerDto) {
    return this.customerService.update(Number(id), dto);
  }

  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    return this.customerService.delete(Number(id));
  }

  @Get()
  getAllCustomers() {
    return this.customerService.getAll();
  }
  
  @Get('search')
searchCustomers(
  @Query('name') name?: string,
  @Query('group') group?: string,
  @Query('code') code?: string,
  @Query('query') query?: string,
) {
  return this.customerService.search({ name, group, code, query });
}

}
