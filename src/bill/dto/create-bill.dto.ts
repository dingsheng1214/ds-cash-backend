import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateBillDto {
  @ApiProperty({
    description: '账单类型 1: 支出 2: 收入',
    example: 1,
  })
  @IsNotEmpty({ message: '请选择账单类型' })
  readonly type: 1 | 2;

  @ApiProperty({
    description: '账单金额',
    example: 123456,
  })
  @IsNotEmpty({ message: '请输入账单金额' })
  readonly amount: bigint;

  @ApiProperty({
    description: '标签ID',
    example: '123456',
  })
  @IsNotEmpty({ message: '请选择标签' })
  readonly tag_id: string;

  @ApiProperty({
    description: '标签名',
    example: '交通',
  })
  @IsNotEmpty({ message: '请选择标签' })
  readonly tag_name: string;

  @ApiProperty({
    description: '用户ID',
    example: '123456',
  })
  @IsNotEmpty({ message: '请选择所属用户' })
  readonly user_id: string;

  @ApiProperty({
    description: '账单日期',
    example: '2022-11-11',
  })
  @IsNotEmpty({ message: '请选择账单日期' })
  readonly date: Date;

  @ApiProperty({
    description: '备注',
    example: '备注',
  })
  readonly remark: string;
}
