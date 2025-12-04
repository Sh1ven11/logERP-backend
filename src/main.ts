import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 🔹 GLOBAL VALIDATION PIPE
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // 🔹 SWAGGER SETUP
  const config = new DocumentBuilder()
    .setTitle('ERP API')
    .setDescription('API documentation for your ERP backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // <--- http://localhost:3333/api

  // 🔹 START SERVER
  await app.listen(process.env.PORT || 3333);
  console.log(`Server running → http://localhost:3333`);
  console.log(`Swagger docs → http://localhost:3333/api`);
}

bootstrap();
