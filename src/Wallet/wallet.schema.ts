import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  balance_usd: number;

  @Prop({ required: true })
  balance_cop: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
