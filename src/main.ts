import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './shared/services/config.service';
import * as RateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { setupFilters, setupInterceptors, setupSwagger } from './startup';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(helmet());
  app.use(
    RateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.use(morgan('combined'));

  app.enableCors();

  setupFilters(app);
  setupInterceptors(app);
  setupSwagger(app, 'FlixGo API', 'List of apis', '1.0.0');

  const port = process.env.PORT || 3000;
  const env = config.get('ENV');

  await app.listen(port);

  console.log(`APP RUN ON ${port}, ENV: ${env}`);
}
bootstrap();
