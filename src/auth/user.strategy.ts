import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { USER_EXISTS_STRATEGY } from 'src/common/utils/constants';
import { AuthService } from './auth.service';

/**
 * 校验用户是否存在
 */
@Injectable()
export class UserStrategy extends PassportStrategy(
  Strategy,
  USER_EXISTS_STRATEGY,
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    return user;
  }
}
