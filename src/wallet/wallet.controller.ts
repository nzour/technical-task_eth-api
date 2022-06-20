import { Controller, Delete, Get, Ip, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AddressWithBalanceDto,
  WalletDto,
  WalletWithPrivateKey,
} from './wallet.dto';
import { GetAddressBalanceQuery } from './cqrs/get-address-balance';
import { DeleteWalletCommand } from './cqrs/delete-wallet';
import { CreateNewWalletCommand } from './cqrs/create-new-wallet-command';

@Controller({ path: '/wallets' })
export class WalletController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('/:address')
  createWallet(@Param('address') address: string): Promise<WalletDto> {
    return this.commandBus.execute(address);
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
}
