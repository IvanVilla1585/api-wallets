import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class WalletRequestDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  balance_usd: number;
}
