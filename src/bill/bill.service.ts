import { BusinessException } from './../common/exceptions/business.exceptions';
import { ListBillDto } from './dto/list-bill.dto';
import { Bill } from './entities/bill.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BillService {
  @InjectRepository(Bill)
  private billRepositity: Repository<Bill>;

  async create(user: User, createBillDto: CreateBillDto) {
    const user_id = user.id;
    const { amount, type, tag_id, tag_name, remark, date } = createBillDto;

    const bill = new Bill();
    bill.amount = amount;
    bill.type = type;
    bill.tag_id = tag_id;
    bill.tag_name = tag_name;
    bill.remark = remark;
    bill.date = date;
    bill.user_id = user_id;
    const result = await this.billRepositity.save(bill);
    return result;
  }

  async list(
    { id: user_id }: User,
    { date, tag_id, type, pageInfo: { page, page_size } }: ListBillDto,
  ) {
    // 1 获取用户所有账单
    const queryBuilder = this.billRepositity
      .createQueryBuilder('bill')
      .where('bill.user_id = :user_id', { user_id })
      .andWhere("to_char(bill.date, 'yyyy-MM') = :date", {
        date: date.toString(),
      });
    if (tag_id) queryBuilder.andWhere('bill.tag_id = :tag_id', { tag_id });
    if (type) queryBuilder.andWhere('bill.type = :type', { type });
    queryBuilder.orderBy('bill.date', 'DESC');
    const bills = await queryBuilder.printSql().getMany();

    // 2 构造返回结果 { date: string, bills: Bill[]}[]
    const result = bills.reduce<{ date: string; bills: Bill[] }[]>(
      (prev, curr) => {
        const _date = dayjs(curr.date).format('YYYY-MM-DD');
        let i: number;
        if ((i = prev.findIndex((item) => item.date === _date)) > -1) {
          prev[i].bills.push(curr);
        } else {
          prev.push({ date: _date, bills: [curr] });
        }
        return prev;
      },
      [],
    );
    // 3 返回结果排序
    result.sort(
      (a, b) => dayjs(a.date).millisecond() - dayjs(b.date).millisecond(),
    );
    // 4 分页
    const page_result =
      result.slice((page - 1) * page_size, page * page_size) || [];

    // 5 计算当月总收入和总支出
    const totalQueryBuilder = this.billRepositity
      .createQueryBuilder('bill')
      .select('type', 'type')
      .addSelect('sum(bill.amount)', 'total')
      .where('bill.user_id = :user_id', { user_id })
      .andWhere("to_char(bill.date, 'yyyy-MM') = :date", {
        date: date.toString(),
      })
      .groupBy('bill.type')
      .printSql();
    const total_arr: { type: 1 | 2; total: number }[] =
      await totalQueryBuilder.getRawMany();
    const total_expense = total_arr.find((item) => item.type === 1)?.total || 0;
    const total_income = total_arr.find((item) => item.type === 2)?.total || 0;
    return {
      total_expense, // 当月支出
      total_income, // 当月收入
      total_page: Math.ceil(result.length / page_size),
      list: page_result,
    };
  }

  findAll() {
    return `This action returns all bill`;
  }

  async findOne(id: string) {
    if (!id) throw new BusinessException('账单id不能为空');
    try {
      const result = await this.billRepositity.findOneBy({ id });
      return result;
    } catch (err) {
      throw new BusinessException('系统错误');
    }
  }

  update(updateBillDto: UpdateBillDto) {
    this.billRepositity.update({ id: updateBillDto.id }, updateBillDto);
  }

  remove(id: string) {
    this.billRepositity.delete({ id });
  }
}