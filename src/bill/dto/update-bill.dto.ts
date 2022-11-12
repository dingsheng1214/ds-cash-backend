import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateBillDto } from './create-bill.dto';

export class UpdateBillDto extends PartialType(CreateBillDto) {
  @ApiProperty({
    description: '账单id',
    example: 1,
  })
  @IsNotEmpty({ message: '账单id不能为空' })
  readonly id: string;
}
