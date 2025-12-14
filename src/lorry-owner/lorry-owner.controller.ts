import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { LorryOwnerService } from './lorry-owner.service';
import { CreateLorryOwnerDto } from './dto/create-lorry-owner.dto';
import { UpdateLorryOwnerDto } from './dto/update-lorry-owner.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guard';

@UseGuards(JwtGuard)

@Controller('lorry-owners')
export class LorryOwnerController {
  constructor(private readonly service: LorryOwnerService) {}

  @Post()
  create(@Body() dto: CreateLorryOwnerDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('companyId') companyId: string) {
    return this.service.findAll(Number(companyId));
  }
  @Get('search')
searchByName(
  @Query('companyId') companyId: string,
  @Query('query') query: string,
) {
  if (!companyId || !query) {
    return [];
  }

  const companyIdNum = Number(companyId);
  return this.service.findByName(companyIdNum, query);
}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLorryOwnerDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
  

}
