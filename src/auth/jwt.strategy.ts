import { JWT_PAYLOAD } from '../../types/global';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_STRATEGY } from 'src/common/utils/constants';
import { getConfig } from 'src/common/utils/yaml';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

const {
  APP_CONFIG: { jwt_secret },
} = getConfig();
/**
 * 校验 jwt存在且有效
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 提供从Request请求头中的 Authorization 提取jwt的方法
      ignoreExpiration: false, // 如果jwt过期, 请求将被拒绝
      secretOrKey: jwt_secret, // jwt秘钥
    });
  }

  /**
   * @param payload
   * @returns
   */
  async validate(payload: JWT_PAYLOAD) {
    /**
     * 返回值作为{@link JwtAuthGuard#handleRequest}的参数
     */
    return { id: payload.id, username: payload.username };
  }
}
