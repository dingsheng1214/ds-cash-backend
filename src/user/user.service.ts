import { LoginDTO } from './dto/login.dto';
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
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: MongoRepository<User>;

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  @Inject()
  private readonly jwtService: JwtService;

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

  async login(loginDTO: LoginDTO) {
    const { password, username } = loginDTO;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();
    if (!user) throw new BusinessException('用户不存在');
    const { password: encryptedPassword, salt } = user;
    if (encrypt(password, salt) !== encryptedPassword)
      throw new BusinessException('密码错误');
    const token = await this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
    return token;
  }
}
