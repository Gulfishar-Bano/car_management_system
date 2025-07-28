
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,  // <-- auto converts query strings to correct types
  }),
);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
