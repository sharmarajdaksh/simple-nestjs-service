import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { createWinstonLogger } from './logging';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: createWinstonLogger(),
  });

  const config = app.get(ConfigService);
  const host = config.get<string>('serverConfig.serverHost');
  const port = config.get<number>('serverConfig.serverPort');

  await app.listen(port, host);
}

bootstrap();
