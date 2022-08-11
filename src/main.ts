import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      forbidUnknownValues: false,
      skipUndefinedProperties: false,
      skipMissingProperties: false,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Virtual Wallets')
    .setDescription('A user can have virtual wallets')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);

  await app.listen(3000);
}
bootstrap();
