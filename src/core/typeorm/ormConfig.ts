import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../../shared/services/config.service';

const getConnectionOptions = (): TypeOrmModuleOptions => {
  const configService = new ConfigService();

  return configService.TypeOrmConfig;
};

export = getConnectionOptions();
