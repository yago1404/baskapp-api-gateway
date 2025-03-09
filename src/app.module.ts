import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { LogMiddleware } from './infra/middlewares/log.middleware';
import { UserModule } from './modules/user/user.module';
import { HttpClientService } from './infra/http/http_client.service';

dotenv.config();

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, HttpClientService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
