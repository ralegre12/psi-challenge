import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Psi‑Challenge API')
  .setDescription('API de psicólogos y sesiones')
  .setVersion('1.0')
  .addTag('psychologists')
  .addTag('sessions')
  .addTag('analytics')
  .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, doc);

  await app.listen(process.env.PORT ?? 3000);
  }
bootstrap();
