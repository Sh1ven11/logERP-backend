import { Controller, Post, Get, Body, Param, Patch, Delete, Query, Req } from '@nestjs/common';
import { ConsignmentService } from './consignment.service';
import { CreateConsignmentDto } from './dto/create-consignment.dto';
import { UpdateConsignmentDto } from './dto/update-consignment.dto';
import { SearchConsignmentDto } from './dto/search-consignment.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guard';

@UseGuards(JwtGuard)
@Controller('consignments')
export class ConsignmentController {
  constructor(private readonly service: ConsignmentService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateConsignmentDto) {
    return this.service.create(dto, req.user.id);
  }

  @Get()
  getAll(
    @Query('companyId') companyId: string,
    @Query('financialYearId') financialYearId: string,
  ) {
    return this.service.findAll(Number(companyId), Number(financialYearId));
  }

  // ⭐ FIXED SEARCH ENDPOINT ⭐
  @Get('search')
  search(@Query() filters: any) {
    // Map "query" -> "cnNumber"
    if (filters.query) {
      filters.cnNumber = filters.query;
      delete filters.query;
    }

    // Ensure numeric fields are cast properly
    if (filters.companyId) filters.companyId = Number(filters.companyId);
    if (filters.financialYearId) filters.financialYearId = Number(filters.financialYearId);
    if (filters.consignorId) filters.consignorId = Number(filters.consignorId);
    if (filters.consigneeId) filters.consigneeId = Number(filters.consigneeId);

    return this.service.search(filters as SearchConsignmentDto);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateConsignmentDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
