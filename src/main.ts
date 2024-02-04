import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe({
    // whitelist: true, 
  }));
  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
  })
  await app.listen(3333);

}
bootstrap();
