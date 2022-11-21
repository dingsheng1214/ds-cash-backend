import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class MakeupDto {
  @ApiProperty({
    description: '账单类型 1: 支出 2: 收入',
    example: 1,
  })
  @IsNotEmpty({ message: '请选择账单类型' })
  readonly type: 1 | 2;

  @ApiProperty({
    description: '账单日期',
    example: '2022-11-11',
  })
  @IsNotEmpty({ message: '请选择账单日期' })
  readonly date: Date;
}
