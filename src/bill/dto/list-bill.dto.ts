import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Pagination } from '../../../types/global';
export class ListBillDto {
  @ApiProperty({
    description: '账单类型 1: 支出, 2: 收入, 不传默认全部',
    example: 1,
  })
  readonly type?: 1 | 2;

  @ApiProperty({
    description: '标签ID, 不传默认全部',
    example: '123456',
  })
  readonly tag_id?: string;

  @ApiProperty({
    description: '账单日期',
    example: '2022-11',
  })
  @IsNotEmpty({ message: '请选择账单日期' })
  readonly date: Date;

  @ApiProperty({
    description: '分页',
    example: { page: 1, page_size: 10 },
  })
  @IsNotEmpty({ message: '分页信息不能为空' })
  readonly pageInfo: Pagination;
}
