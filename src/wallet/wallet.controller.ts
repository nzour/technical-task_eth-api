import { Controller, Delete, Get, Ip, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AddressWithBalanceDto,
  AddressWithEthBalanceDto,
  WalletDto,
  WalletWithPrivateKey,
} from './wallet.dto';
import { GetAddressBalanceQuery } from './cqrs/get-address-balance';
import { DeleteWalletCommand } from './cqrs/delete-wallet';
import { CreateNewWalletCommand } from './cqrs/create-new-wallet-command';
import { GetAddressEthBalanceQuery } from './cqrs/get-address-eth-balance';
import { CreateWalletCommand } from './cqrs/create-wallet';

@Controller({ path: '/wallets' })
export class WalletController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('/:address')
  createWallet(@Param('address') address: string): Promise<WalletDto> {
    return this.commandBus.execute(new CreateWalletCommand(address));
  }

  @Post()
  createNewWallet(): Promise<WalletWithPrivateKey> {
    return this.commandBus.execute(new CreateNewWalletCommand());
  }

  @Delete('/:address')
  deleteWallet(@Param('address') address: string): Promise<void> {
    return this.commandBus.execute(new DeleteWalletCommand(address));
  }

  @Get('/:address')
  getWallet(
    @Ip() requestIp: string,
    @Param('address') address: string,
  ): Promise<AddressWithBalanceDto> {
    return this.queryBus.execute(
      new GetAddressBalanceQuery(address, requestIp),
    );
  }

  @Get('/eth-balance/:address')
  getEthBalance(
    @Ip() requestIp: string,
    @Param('address') address: string,
  ): Promise<AddressWithEthBalanceDto> {
    return this.queryBus.execute(
      new GetAddressEthBalanceQuery(address, requestIp),
    );
  }
}
