import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddressWithBalanceDto, WalletDto } from './wallet.dto';
import { CreateWalletCommand } from './cqrs/create-wallet';
import { GetAddressBalanceQuery } from './cqrs/get-address-balance';
import { Request } from 'express';

@Controller({ path: '/wallets' })
export class WalletController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  createWallet(@Body() command: CreateWalletCommand): Promise<WalletDto> {
    return this.commandBus.execute(command);
  }

  @Get()
  async getWallet(
    @Req() request: Request,
    @Query('address') address: string,
  ): Promise<AddressWithBalanceDto> {
    return this.queryBus.execute(new GetAddressBalanceQuery(address, request));
  }
}
