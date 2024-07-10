import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './http-Exception.filter';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('내일배움캠프 심화 개인과제')
    .setDescription('내일배움캠프 심화 개인과제 API 명세서')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }) // JWT 사용을 위한 설정
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/sparta', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 새로고침 시에도 JWT 유지하기
      tagsSorter: 'alpha', // API 그룹 정렬을 알파벳 순으로
      operationsSorter: 'alpha', // API 그룹 내 정렬을 알파벳 순으로
    },
  });

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
