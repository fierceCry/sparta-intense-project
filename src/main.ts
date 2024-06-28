import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-Exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('내일배움캠프 심화 개인과제')
    .setDescription('내일배움캠프 심화 개인과제 API 명세서')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/sparta', app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  await app.listen(PORT);
  console.log(`${process.env.PORT}포트로 서버가 열렸습니다.`);
}
bootstrap();
