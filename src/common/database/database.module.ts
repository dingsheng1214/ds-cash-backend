import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { User } from 'src/user/entities/user.entity';
import { Logger } from '../utils/log4j';
import { getConfig } from '../utils/yaml';

const { MONGODB_CONFIG, PG_CONFIG } = getConfig();
const DATABASE_CONFIG = {
  mongodb: MONGODB_CONFIG,
  pg: PG_CONFIG,
};

type databaseType = keyof typeof DATABASE_CONFIG;

/**
 *  动态模块, 可以根据需求动态加载不同类型数据库
 */
@Module({})
export class DatabaseModule {
  static register(type: databaseType): DynamicModule {
    return TypeOrmModule.forRoot(DatabaseModule.getDBConfig(type));
  }

  static registerAsync(type: databaseType): DynamicModule {
    return TypeOrmModule.forRootAsync({
      useFactory() {
        return DatabaseModule.getDBConfig(type);
      },
    });
  }

  private static getDBConfig(type: databaseType) {
    const config = {
      ...DATABASE_CONFIG[type],
      // 只要是以 entity.ts 结尾的实例类，都会被自动扫描识别，并在数据库中生成对应的实体表, HRM热更新时无效, 需要手动引入
      // entities: [path.join(__dirname, `../../**/*.entity.{ts,js}`)],
      entities: [User],
      // ! MongoDB 是无模式的，所以即使在配置参数开启了 synchronize，启动项目的时候也不会去数据库创建对应的表，所以不用奇怪，并没有出错，
      // ! 但 Mysql 在每次应用程序启动时自动同步表结构，容易造成数据丢失，生产环境记得关闭，以免造成无可预计的损失
      synchronize: process.env.NODE_ENV === 'dev' ? true : false,
    };
    Logger.msg(`DatabaseConfig: ${JSON.stringify(config)}`);
    return config;
  }
}
