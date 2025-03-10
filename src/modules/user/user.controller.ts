import { Controller, Post, Req, Res } from '@nestjs/common';
import { InternalClientService } from '../../infra/http/internal_client_service';
import { Request, Response } from 'express';
import { InternalResponseModel } from '../../infra/models/internal_response_model';

@Controller('user')
export class UserController {
  constructor(private client: InternalClientService) {}

  @Post('/login')
  async login(@Req() request: Request, @Res() response: Response) {
    const result = await this.client.post<InternalResponseModel<undefined>>(
      '/user/login',
      request,
    );
    return response.status(result.statusCode).json(result);
  }

  @Post()
  async createUser(@Req() request: Request, @Res() response: Response) {
    const result = await this.client.post<InternalResponseModel<undefined>>(
      '/user',
      request,
    );
    return response.status(result.statusCode).json(result);
  }

  @Post('/refresh')
  async refreshToken(@Req() request: Request, @Res() response: Response) {
    const result = await this.client.post<InternalResponseModel<undefined>>(
      '/user/refresh',
      request,
    );
    return response.status(result.statusCode).json(result);
  }
}
