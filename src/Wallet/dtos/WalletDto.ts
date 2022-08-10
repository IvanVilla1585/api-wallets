import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class WalletDto {
  @IsString()
  userId?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  balance_usd: number;
}
