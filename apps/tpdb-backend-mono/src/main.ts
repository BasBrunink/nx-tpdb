/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const apiDocConfig = new DocumentBuilder()
    .setTitle('TPDB API')
    .setDescription('The TPDB Backend at your service')
    .setVersion('0.0.1')
    .addTag('TPDB')
    .build()
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const documentFactory = () => SwaggerModule.createDocument(app, apiDocConfig);
  SwaggerModule.setup('api/docs', app, documentFactory);
  const configService = app.get<ConfigService>(ConfigService)
  const port = process.env.PORT ?? configService.get('APP_PORT')
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
