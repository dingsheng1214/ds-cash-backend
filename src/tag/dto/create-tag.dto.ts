import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: '账单类型 1: 支出 2: 收入',
    example: 1,
  })
  @IsNotEmpty({ message: '请选择账单类型' })
  readonly type: 1 | 2;

  @ApiProperty({
    description: '标签名',
    example: '交通',
  })
  @IsNotEmpty({ message: '标签名不能为空' })
  @Length(0, 4)
  readonly name: string;
}
