import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DatabaseEntities } from '../../core/typeorm';

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
      synchronize: true,
      logging: "all",
      entities: DatabaseEntities,
      migrations: ['scr/core/typeorm/migrations/*.ts'],
      cli: {
        migrationsDir: 'src/core/typeorm/migrations',
      },
      factories: ['src/core/typeorm/factories/**/*{.ts,.js}'],
      seeds: ['src/core/typeorm/seeds/**/*{.ts,.js}']
    } as TypeOrmModuleOptions;
  }
}
