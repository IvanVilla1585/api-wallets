import { ApiProperty } from '@nestjs/swagger';

import { UserBaseDto } from '../../Dtos/UserBaseDto';

export class UserAuthResponseDto extends UserBaseDto {
  @ApiProperty({ required: true })
  token: string;
}
