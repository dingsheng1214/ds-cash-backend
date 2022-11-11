import { JwtStrategy } from './jwt.strategy';
import { getConfig } from 'src/common/utils/yaml';
import { UserStrategy } from './user.strategy';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

const {
  APP_CONFIG: { jwt_secret, jwt_expire },
} = getConfig();
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwt_secret,
      signOptions: {
        expiresIn: jwt_expire,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
