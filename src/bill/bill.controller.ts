import { RankBillDto } from './dto/rank-bill.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { ListBillDto } from './dto/list-bill.dto';
import { MakeupDto } from './dto/makeup.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Request() req, @Body() createBillDto: CreateBillDto) {
    return this.billService.create(req.user, createBillDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('list')
  list(@Request() req, @Body() listBillDto: ListBillDto) {
    return this.billService.list(req.user, listBillDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('rank')
  rank(@Request() req, @Body() rankBillDto: RankBillDto) {
    return this.billService.rank(req.user, rankBillDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(id);
  }

  @Post('update')
  update(@Body() updateBillDto: UpdateBillDto) {
    return this.billService.update(updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('makeup')
  makeup(@Request() req, @Body() makeupDto: MakeupDto) {
    return this.billService.makeup(req.user, makeupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('dailyCompare')
  dailyCompare(@Request() req, @Body() makeupDto: MakeupDto) {
    return this.billService.dailyCompare(req.user, makeupDto);
  }
}
