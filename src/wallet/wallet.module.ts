import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { AddressBalanceLog } from './entities/address-balance-log.entity';
import { CreateWalletHandler } from './cqrs/create-wallet';
import { CreateWalletHandler as CreateWalletEventHandler } from './cqrs/events/create-wallet.handler';
import { GetAddressBalanceHandler } from './cqrs/get-address-balance';
import { LogAddressBalanceHandler } from './cqrs/events/log-address-balance.handler';
import { WalletController } from './wallet.controller';
import { SharedModule } from '../shared/shared.module';
import { EthService } from '../shared/eth.service';
import { CqrsModule } from '@nestjs/cqrs';
import { DeleteWalletHandler } from './cqrs/delete-wallet';
import { WalletDeletedHandler } from './cqrs/events/wallet-deleted.handler';

const commandAndQueryHandlers = [
  CreateWalletHandler,
  DeleteWalletHandler,
  GetAddressBalanceHandler,
];

const eventHandlers = [
  CreateWalletEventHandler,
  WalletDeletedHandler,
  LogAddressBalanceHandler,
];

@Module({
  imports: [
    SharedModule,
    CqrsModule,
    TypeOrmModule.forFeature([Wallet, AddressBalanceLog]),
  ],
  controllers: [WalletController],
  providers: [Logger, EthService, ...commandAndQueryHandlers, ...eventHandlers],
})
export class WalletModule {}
