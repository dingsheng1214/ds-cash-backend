import { BusinessException } from './../common/exceptions/business.exceptions';
import { encrypt } from 'src/common/utils/crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from './../user/user.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  @Inject()
  private userService: UserService;

  @Inject()
  private JwtService: JwtService;

  /**
   * 校验
   * 1. 用户是否存在,
   * 2. 密码是否正确
   * @param username
   * @param password
   * @returns
   */
  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'salt'],
    });
    if (!user) {
      throw new BusinessException('用户名不存在');
    }
    const { id, password: dbPassword, salt } = user;
    const encryptedPassword = encrypt(password, salt);
    if (id && dbPassword === encryptedPassword) {
      return user;
    } else {
      throw new BusinessException('密码错误');
    }
  }

  async login(user: User) {
    const payload = { username: user.username, id: user.id };
    return this.JwtService.sign(payload);
  }
}
