import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //14.2.1
  app.use(helmet());
  //14.1.1
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
