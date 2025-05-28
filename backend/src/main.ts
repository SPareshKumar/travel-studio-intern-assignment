import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  // Enable CORS for your frontend and development
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://s-paresh-kumar-gydexp-intern-assign.vercel.app',
      'https://s-paresh-kumar-gydexp-intern-assign.vercel.app/', // with trailing slash
      'https://travel-backend-9msjkv0b4-sparesh2005-gmailcoms-projects.vercel.app', // your backend URL
      process.env.NODE_ENV === 'development' ? '*' : undefined, // Allow all in development only
    ].filter(Boolean), // Remove undefined values
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Accept', 
      'Origin', 
      'X-Requested-With',
      'ngrok-skip-browser-warning'
    ],
    credentials: false,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  return app.init();
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
      origin: [
        'http://localhost:3001',
        'https://205d-183-83-156-73.ngrok-free.app',
        'https://s-paresh-kumar-gydexp-intern-assign.vercel.app',
        'https://s-paresh-kumar-gydexp-intern-assign.vercel.app/',
        '*'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'Accept', 
        'Origin', 
        'X-Requested-With',
        'ngrok-skip-browser-warning'
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
  };
  bootstrap();
}

// Initialize for Vercel
createNestServer(server)
  .then(() => console.log('Nest Ready for Vercel'))
  .catch(err => console.error('Nest initialization failed', err));

// Export the server for Vercel
export default server;