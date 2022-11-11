import { BusinessException } from './../common/exceptions/business.exceptions';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Logger } from 'src/common/utils/log4j';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { makeSalt, encrypt } from 'src/common/utils/crypto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: MongoRepository<User>;

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

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
    return this.userRepository.save(user);
  }

  async findAll() {
    await this.cacheManager.set('name', 'ding', { ttl: 0 });
    const res = await this.cacheManager.get('name');
    Logger.info(res);
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
