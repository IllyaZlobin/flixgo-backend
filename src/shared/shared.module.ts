import { Module, HttpModule, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from './services/config.service';

const providers = [ConfigService];
@Global()
@Module({
  providers,
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      useFactory: (_configService: ConfigService) => ({
        secretOrPrivateKey: _configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: _configService.getNumber('JWT_EXPIRATION_TIME'),
          issuer: 'flixgo',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule {}
