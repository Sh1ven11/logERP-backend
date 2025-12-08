import { Controller, Post, Body, Get, Query, Param, Patch, Delete, Req } from '@nestjs/common';
import { LorryHireService } from './lorry-hire.service';
import { CreateLorryHireDto } from './dto/create-lorry-hire.dto';
import { UpdateLorryHireDto } from './dto/update-lorry-hire.dto';
import { AddConsignmentsDto } from './dto/add-consignments.dto';
import { SearchLorryHireDto } from './dto/search-lorry-hire.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guard';

@UseGuards(JwtGuard)

@Controller('lorry-hire')
export class LorryHireController {
  constructor(private readonly service: LorryHireService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateLorryHireDto) {
    return this.service.create(dto, req.user.id);
  }

  @Get()
  findAll(@Query() filters: SearchLorryHireDto) {
    return this.service.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post(':id/consignments')
  addConsignments(@Param('id') id: string, @Body() dto: AddConsignmentsDto) {
    return this.service.addConsignments(Number(id), dto);
  }

  @Delete(':id/consignments/:cnId')
  removeConsignment(@Param('id') id: string, @Param('cnId') cnId: string) {
    return this.service.removeConsignment(Number(id), Number(cnId));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLorryHireDto) {
    return this.service.update(Number(id), dto);
  }

  @Post(':id/settle')
  settle(@Param('id') id: string, @Body() body: { paymentDate?: string }) {
    return this.service.settle(Number(id), body?.paymentDate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
