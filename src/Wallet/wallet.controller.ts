import {
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { WalletRequestDto, WalletResponseDto } from './dtos';

@ApiBearerAuth()
@ApiTags('Wallets')
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiResponse({ status: 201, type: WalletResponseDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() data: WalletRequestDto,
    @Request() req,
  ): Promise<WalletResponseDto> {
    return this.walletService.create({ ...data, userId: req.user.id });
  }

  @ApiResponse({ status: 200, type: WalletResponseDto })
  @ApiParam({ name: 'id', type: 'string' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Body() data: WalletRequestDto,
    @Param() params,
  ): Promise<WalletResponseDto> {
    return this.walletService.update(params.id, data.balance_usd);
  }
}
