import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Wallet, WalletDocument } from './wallet.schema';
import { WalletDto, WalletResponseDto } from './dtos';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async create({ userId, balance_usd }: WalletDto): Promise<WalletResponseDto> {
    const balance_cop: number = balance_usd * 4300;
    const wallet: WalletDocument = new this.walletModel({
      userId,
      balance_usd,
      balance_cop,
    });

    await wallet.save();

    return {
      id: wallet.id,
      userId: wallet.userId.toString(),
      balance_usd: wallet.balance_usd,
      balance_cop: wallet.balance_cop,
    };
  }

  async update(id: string, balance_usd: number): Promise<WalletResponseDto> {
    const wallet: WalletDocument = await this.walletModel.findById(id);

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    wallet.balance_usd += balance_usd;
    wallet.balance_cop += balance_usd * 4300;

    await wallet.save();

    return {
      id: wallet.id,
      userId: wallet.userId.toString(),
      balance_usd: wallet.balance_usd,
      balance_cop: wallet.balance_cop,
    };
  }
}
