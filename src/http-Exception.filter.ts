import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | { message: any; statusCode: number }
      | { error: string; statusCode: 400; message: string[] };

    let errorMessage: string;
    if (typeof err !== 'string' && err.statusCode === 400) {
      errorMessage = err.message[0];
    } else {
      errorMessage = err.message.toString();
    }

    response.status(status).json({
      status: status,
      message: errorMessage,
    });
  }
}
