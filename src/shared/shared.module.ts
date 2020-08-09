import { HttpModule, Module, Global } from '@nestjs/common';
import { ConfigService } from './services/config.service';

@Global()
@Module({
  providers: [ConfigService],
  imports: [HttpModule],
  exports: [ConfigService],
})
export class SharedModule {}
