import { BusinessException } from './../common/exceptions/business.exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { makeSalt, encrypt } from 'src/common/utils/crypto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: MongoRepository<User>;

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const isExisted = await this.userRepository.findOne({
      where: { username },
    });
    if (isExisted) {
      throw new BusinessException('用户名已存在');
    }

    const user = new User();
    user.username = username;
    user.salt = makeSalt();
    user.password = encrypt(password, user.salt);
    const dbUser = await this.userRepository.save(user);
    return { id: dbUser.id, username: dbUser.username };
  }

  findOne(findOptions: FindOneOptions<User>) {
    return this.userRepository.findOne(findOptions);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);

    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    this.userRepository.delete({ id });
  }
}
