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
    // force numbers (protect against React sending strings)
    dto.companyId = Number(dto.companyId);
    dto.financialYearId = Number(dto.financialYearId);
    dto.branchId = Number(dto.branchId);

    return this.service.create(dto, req.user.id);
  }

  @Get()
  getAll(
    @Query('companyId') companyId: string,
    @Query('financialYearId') financialYearId: string,
  ) {
    return this.service.findAll(Number(companyId), Number(financialYearId));
  }

  @Get('search')
  search(@Query() filters: any) {
    // Map "query" to "cnNumber"
    if (filters.query) {
      filters.cnNumber = filters.query;
      delete filters.query;
    }

    // Ensure numeric conversion
    if (filters.companyId) filters.companyId = Number(filters.companyId);
    if (filters.financialYearId) filters.financialYearId = Number(filters.financialYearId);
    if (filters.consignorId) filters.consignorId = Number(filters.consignorId);
    if (filters.consigneeId) filters.consigneeId = Number(filters.consigneeId);

    return this.service.search(filters as SearchConsignmentDto);
  }

  @Get(':id')
async getOne(@Param('id') id: string) {
  const data = await this.service.findOne(Number(id));
  console.log("RETURNING CN:", data);
  return data;
}


  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateConsignmentDto) {
    // convert IDs if present
    if (dto.companyId) dto.companyId = Number(dto.companyId);
    if (dto.financialYearId) dto.financialYearId = Number(dto.financialYearId);
    if (dto.consignorId) dto.consignorId = Number(dto.consignorId);
    if (dto.consigneeId) dto.consigneeId = Number(dto.consigneeId);
    if (dto.fromDestinationId) dto.fromDestinationId = Number(dto.fromDestinationId);
    if (dto.toDestinationId) dto.toDestinationId = Number(dto.toDestinationId);

    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
