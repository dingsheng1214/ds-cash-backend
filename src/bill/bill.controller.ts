import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { ListBillDto } from './dto/list-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post('create')
  create(@Body() createBillDto: CreateBillDto) {
    return this.billService.create(createBillDto);
  }

  @Post('list')
  list(@Body() listBillDto: ListBillDto) {
    return this.billService.list(listBillDto);
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
}
