
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,  // <-- auto converts query strings to correct types
  }),
);

const config = new DocumentBuilder()
    .setTitle('Car Booking API')
    .setDescription('API docs for Car Booking System')
    .setVersion('1.0')
    .addBearerAuth() // if you plan to use JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
