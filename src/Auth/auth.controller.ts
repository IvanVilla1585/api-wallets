import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto, UserAuthResponseDto } from './dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @ApiResponse({ status: 200, type: UserAuthResponseDto })
  @Post('/login')
  login(@Body() data: AuthDto): Promise<UserAuthResponseDto> {
    return this.userService.login(data);
  }
}
