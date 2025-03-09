import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('/login')
  async login(@Body() body: any) {
    return body;
  }
}
