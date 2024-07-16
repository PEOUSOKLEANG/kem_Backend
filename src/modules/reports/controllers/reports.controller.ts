import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { SystemRolesGuard } from 'src/common/guards/system_roles.guard';
import { ERole } from 'src/common/enum/role.enum';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // @Post('report')
  // async createReport(@Body() createReportDto:CreateReportDto){
  //   return await this.reportsService.CreateReport(createReportDto);
  // }
  @UseGuards(AccessTokenGuard, SystemRolesGuard)
  @Roles(ERole.User)
  @Post('report')
  async createReport(
    @Req() req:any,
    @Body() createReportDto:CreateReportDto
  ){
    return await this.reportsService.reportPost(createReportDto, req.user.sub);
  }


  // Get Report by Admin
  @UseGuards(AccessTokenGuard, SystemRolesGuard)
  @Roles(ERole.Admin)
  async getReport(){
    return await this.reportsService.getReport();
  }

}
