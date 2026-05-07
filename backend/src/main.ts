import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // ← enables @Type() transformations
      whitelist: true, // strips unknown properties
      forbidNonWhitelisted: false,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
