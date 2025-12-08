import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guard';

@UseGuards(JwtGuard)

@Controller("invoices")
export class InvoiceController {
  constructor(private service: InvoiceService) {}

  @Post()
  create(@Body() dto: CreateInvoiceDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.service.findOne(Number(id));
  }
}
