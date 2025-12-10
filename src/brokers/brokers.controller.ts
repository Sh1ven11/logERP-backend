import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query
} from '@nestjs/common';
import { BrokersService } from './brokers.service';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { JwtGuard } from 'src/common/guard';

@UseGuards(JwtGuard)
@Controller('brokers')
export class BrokersController {
  constructor(private readonly brokersService: BrokersService) {}

  @Post()
  create(@Body() dto: CreateBrokerDto) {
    return this.brokersService.create(dto);
  }

  @Get()
  findAll(@Query('companyId') companyId: string) {
    // FIX: Extract companyId from query and pass it as a number
    console.log('Received companyId:', companyId);
    if (!companyId) {
        // Handle case where companyId is missing (optional: return 400 or empty list)
        return []; 
    }
    
    // Ensure the ID is converted to a number
    const companyIdNum = parseInt(companyId, 10);
    
    return this.brokersService.findAll(companyIdNum);
  } 
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.brokersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBrokerDto,
  ) {
    return this.brokersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brokersService.remove(id);
  }
}
