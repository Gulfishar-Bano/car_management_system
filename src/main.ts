import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path'; // <--- 1. IMPORT 'join' FROM 'path'
import { NestExpressApplication } from '@nestjs/platform-express'; // <--- 2. IMPORT NEST EXPRESS APP TYPE

async function bootstrap() {
    // Use NestExpressApplication type for static file serving capability
    const app = await NestFactory.create<NestExpressApplication>(AppModule); // <--- 3. APPLY TYPE ANNOTATION

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    
    app.useStaticAssets(join(__dirname, '..', 'uploads'), { 
        prefix: '/uploads',
    });
    

    const config = new DocumentBuilder()
        .setTitle('Car Booking API')
        .setDescription('API docs for Car Booking System')
        .setVersion('1.0')
        .addBearerAuth() 
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.enableCors();
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();