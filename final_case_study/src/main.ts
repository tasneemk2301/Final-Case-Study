import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: false
  }));

  const config = new DocumentBuilder()
    .setTitle('SWAGGER')
    .setDescription('Flight Booking')
    .setVersion('1.0')
    .addTag('flights')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
// bootstrap();

AppService.clusterize(bootstrap);


