import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for ngrok and frontend
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://205d-183-83-156-73.ngrok-free.app',
      'https://s-paresh-kumar-gydexp-intern-assign.vercel.app/',
      '*' // Remove this in production for security
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Accept', 
      'Origin', 
      'X-Requested-With',
      'ngrok-skip-browser-warning' // Add this for ngrok
    ],
    credentials: false,
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`NestJS server running on http://localhost:${port}`);
  console.log('Make sure your ngrok is tunneling this port!');
}
bootstrap();