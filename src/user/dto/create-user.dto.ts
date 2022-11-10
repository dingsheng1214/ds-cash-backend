import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  id?: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;
}
