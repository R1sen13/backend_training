import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = process.env.NODE_ENV === 'development' ? 'api' : '';

  app.setGlobalPrefix(globalPrefix);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Swagger API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();

  const swaggerDocumentation = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, swaggerDocumentation, {
    useGlobalPrefix: true,
  });

  const port = process.env.PORT ?? 3000;

  await app.listen(port, '0.0.0.0');

  const url = await app.getUrl();

  const logger = new Logger('Bootstrap');

  logger.log(
    `Application is running on: ${url}${globalPrefix !== '' ? '/' + globalPrefix : ''}`,
  );
  logger.log(
    `Swagger is available at: ${url}${globalPrefix !== '' ? '/' + globalPrefix : ''}/docs`,
  );
}
void bootstrap();
