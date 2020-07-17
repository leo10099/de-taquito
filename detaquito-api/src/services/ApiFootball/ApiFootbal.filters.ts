import { ExceptionFilter, Catch, HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';

@Catch()
export class ApiFootballErrorHandler implements ExceptionFilter {
  catch(exception: AxiosError) {
    const errorMessage = exception.response.data?.message || exception.response.statusText;
    throw new HttpException(errorMessage, exception.response.status);
  }
}
