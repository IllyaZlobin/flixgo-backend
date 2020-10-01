import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DatabaseEntities } from '../../core/typeorm';
import { IS3Config } from '../../core/models';

@Injectable()
export class ConfigService {
  constructor() {
    const nodeEnv = this.nodeEnv;
    dotenv.config({
      path: `env/.${nodeEnv}.env`,
    });
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'dev';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'prod';
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('ENV') || 'dev';
  }

  get TypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.get('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.get('DB_USERNAME'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_DATABASE'),
      synchronize: false,
      logging: 'all',
      entities: DatabaseEntities,
      migrationsTableName: 'custom_migration_table',
      migrations: ['dist/core/typeorm/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/core/typeorm/migrations',
      },
      factories: ['src/core/typeorm/factories/**/*{.ts,.js}'],
      seeds: ['src/core/typeorm/seeds/**/*{.ts,.js}'],
    } as TypeOrmModuleOptions;
  }

  get s3Config(): IS3Config {
    return {
      accessKeyId: this.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.get('AWS_SECRET_ACCESS_KEY'),
      bucketName: this.get('AWS_BUCKET_NAME'),
    };
  }
}
