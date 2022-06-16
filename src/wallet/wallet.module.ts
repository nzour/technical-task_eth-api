import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { AddressBalanceLog } from './entities/address-balance.log';
import { CreateWalletHandler } from './cqrs/create-wallet';
import { CreateWalletHandler as CreateWalletEventHandler } from './cqrs/events/create-wallet.handler';
import { GetAddressBalanceHandler } from './cqrs/get-address-balance';
import { LogAddressBalanceHandler } from './cqrs/events/log-address-balance.handler';
import { WalletController } from './wallet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, AddressBalanceLog])],
  controllers: [WalletController],
  providers: [
    CreateWalletHandler,
    GetAddressBalanceHandler,
    CreateWalletEventHandler,
    LogAddressBalanceHandler,
  ],
})
export class WalletModule {}
