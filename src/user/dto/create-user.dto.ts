import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '用户名',
    example: '张三',
  })
  @IsNotEmpty({ message: '请输入用户名称' })
  @IsString({ message: '名字必须是 String 类型' })
  readonly username: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}
