import { Module, HttpModule } from '@nestjs/common';

// Module
import { ApiFootballService } from './ApiFootball.service';
import { ApiFootballController } from './ApiFootball.controller';

// Services
import { ConfigService, ConfigModule } from '@nestjs/config';

// Types
import { RapidApiConfig } from '../../config/configuration';
import { AxiosRequestConfig } from 'axios';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<AxiosRequestConfig> => ({
        timeout: 5000,
        baseURL: configService.get(RapidApiConfig.RAPID_API_BASE_URL),
        headers: {
          'X-RapidAPI-Key': configService.get(RapidApiConfig.RAPID_API_KEY),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ApiFootballController],
  providers: [ApiFootballService],
  exports: [ApiFootballService],
})
export class ApiFootballModule {}
