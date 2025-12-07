// company.controller.ts
import { Controller, Post, Get, Body, Param,Req } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
@UseGuards(AuthGuard('jwt'))

@Controller('companies')
export class CompanyController {
  constructor(private service: CompanyService) {}

  @Post()
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
 @Get('my')
  getMyCompanies(@Req() req) {
    return this.service.findCompaniesForUser(req.user.id);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  // ⭐ Get all companies a user works for
 

  @Get('branches/:id')
  getBranches(@Param('id') id: number) {
    return this.service.findBranches(Number(id));
  }
  @Get('financial-years/:id')
  getYears(@Param('id') id: number) {
    return this.service.findFinancialYears(Number(id));
  }

}
