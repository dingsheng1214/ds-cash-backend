import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { RedisModule } from './common/database/redis.module';
import { UserModule } from './user/user.module';

import { ConfigModule } from '@nestjs/config';
import { getConfig } from 'src/common/utils/yaml';

@Module({
  imports: [
    DatabaseModule.registerAsync('pg'),
    ConfigModule.forRoot({
      ignoreEnvFile: true, // 忽略 .env 文件
      isGlobal: true,
      load: [getConfig]
    }),
    RedisModule.register(),
    UserModule
  ],
  providers: []
})
export class AppModule {}
