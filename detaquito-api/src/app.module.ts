import { join } from 'path';
import { CacheModule, CacheInterceptor, Module } from '@nestjs/common';

// Interceptors
import { APP_INTERCEPTOR } from '@nestjs/core';

// Services
import { ConfigService } from '@nestjs/config';

// Modules
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { CompetitionModule } from './api/competition/competition.module';
import { ClubModule } from './api/club/club.module';
import { ApiFootballModule } from './services/ApiFootball/ApiFootball.module';

// Components
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';

// Types
import { Config, DatabaseConfig, MainConfig } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [Config] }),
    CacheModule.register(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../detaquito-web', 'build'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(DatabaseConfig.HOST),
        port: configService.get(DatabaseConfig.PORT),
        username: configService.get(DatabaseConfig.USERNAME),
        password: configService.get(DatabaseConfig.PASSWORD),
        database: configService.get(DatabaseConfig.NAME),
        entities: [__dirname + '/api/**/*.entity{.ts,.js}'],
        logging: configService.get(MainConfig.IS_DEV),
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ApiFootballModule,
    AuthModule,
    CompetitionModule,
    ClubModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
})
export class AppModule {}
