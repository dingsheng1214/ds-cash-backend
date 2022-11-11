import { USER_EXISTS_STRATEGY } from 'src/common/utils/constants';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * User 守卫, 使用 user策略
 */
@Injectable()
export class UserAuthGuard extends AuthGuard(USER_EXISTS_STRATEGY) {}
