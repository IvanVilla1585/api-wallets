import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './Auth/auth.module';
import { UserModule } from './User/user.module';
import { WalletModule } from './Wallet/wallet.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    WalletModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
})
export class AppModule {}
