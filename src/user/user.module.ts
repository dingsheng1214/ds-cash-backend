import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'dasdjanksjdasd', // 秘钥
      signOptions: { expiresIn: '8h' }, // token 过期时效
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
