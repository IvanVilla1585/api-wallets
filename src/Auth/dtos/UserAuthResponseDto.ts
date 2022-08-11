import { ApiProperty } from '@nestjs/swagger';

import { UserBaseDto } from '../../Dtos/UserBaseDto';

export class UserAuthResponseDto {
  @ApiProperty({ required: true })
  token: string;

  @ApiProperty({ required: true })
  user: UserBaseDto;
}
