import { ApiProperty } from '@nestjs/swagger';

export class WalletResponseDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  balance_usd: number;

  @ApiProperty({ required: true })
  balance_cop: number;
}
