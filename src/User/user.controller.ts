import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto, UserResponseDto } from './dtos';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 201, type: UserResponseDto })
  @Post()
  create(@Body() data: UserDto): Promise<UserResponseDto> {
    return this.userService.create(data);
  }
}
