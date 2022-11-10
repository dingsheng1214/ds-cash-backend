import { CacheModule, DynamicModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { Logger } from '../utils/log4j';
import { getConfig } from '../utils/yaml';
const { REDIS_CONFIG } = getConfig();

Logger.info(REDIS_CONFIG);
/**
 *  动态模块, 可以根据需求动态加载不同类型数据库
 */
@Module({})
export class RedisModule {
  static register(): DynamicModule {
    return CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: REDIS_CONFIG.host,
      port: REDIS_CONFIG.port,
      ttl: 0,
      // auth_pass: REDIS_CONFIG.auth,
      db: REDIS_CONFIG.db
    });
  }
}
