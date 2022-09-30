import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().build(),
  );
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
