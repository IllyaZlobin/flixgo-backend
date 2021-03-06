import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './shared/services/config.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/env')
  getEnv(): string {
    return this.configService.nodeEnv;
  }
}
