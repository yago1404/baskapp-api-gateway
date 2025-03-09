import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { InternalClientService } from '../../infra/http/internal_client_service';

@Module({
  controllers: [UserController],
  providers: [UserService, InternalClientService],
})
export class UserModule {}
