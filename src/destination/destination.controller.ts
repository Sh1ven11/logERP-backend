import { Controller, Get, Post, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { SearchDestinationDto } from './dto/search-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guard';

@UseGuards(JwtGuard)

@Controller('destinations')
export class DestinationController {
  constructor(private readonly service: DestinationService) {}

  @Post()
  create(@Body() dto: CreateDestinationDto) {
    return this.service.create(dto);
  }

  @Get('search')
  search(@Query() filters: SearchDestinationDto) {
    return this.service.search(filters);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDestinationDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.softDelete(Number(id));
  }
}
