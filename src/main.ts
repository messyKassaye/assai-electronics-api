import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.PORT ?? 5000;

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('A2SV E-Commerce API')
    .setDescription('API documentation for A2SV E-Commerce')
    .setVersion('1.0')
    .addBearerAuth() // Enables JWT Auth if you use it
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  // Handle multiple origins from environment variable
  const origins = process.env.ORIGINS?.split(',').map(origin => origin.trim()) || [];

  app.enableCors({
    origin: origins, // array of allowed origins
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })
  );

  await app.listen(PORT);
  console.log(`Listening on http://localhost:${PORT}`);
  console.log(`📘 Swagger docs available at: http://localhost:${PORT}`);
}
bootstrap();
