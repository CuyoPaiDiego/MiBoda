import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors(); // Sin opciones = permite todo


  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ limit: "50mb", extended: true }));
  app.setGlobalPrefix("api");

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
}
bootstrap();
