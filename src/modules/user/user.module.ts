import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { InternalClientService } from '../../infra/http/internal_client_service';

@Module({
  controllers: [UserController],
  providers: [InternalClientService],
})
export class UserModule {}
