import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { generateApi } from 'swagger-typescript-api';
import * as path from 'path';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  generateApi({
    spec: document as any,
  }).then(({ files }) => {
    files.forEach(({ fileContent }) => {
      fs.writeFileSync(
        path.resolve(__dirname, `../../../frontend/src/services/_api.ts`),
        fileContent,
      );
    });
  });

  await app.listen(3000);
}
bootstrap();
