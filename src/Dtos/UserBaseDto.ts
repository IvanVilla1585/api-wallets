import { ApiProperty } from '@nestjs/swagger';

export class UserBaseDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  fullName: string;

  @ApiProperty({ required: true })
  document: string;

  @ApiProperty({ required: false })
  address?: string;
}
