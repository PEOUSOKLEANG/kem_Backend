import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({  
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3002, ()=>{
    console.log('App is running on port http://localhost:3002');  
  });
}
bootstrap();
