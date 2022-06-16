import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { WalletDto, WalletWithBalanceDto } from './wallet.dto';
import { CreateWalletCommand } from './cqrs/create-wallet';
import { GetAddressBalanceQuery } from './cqrs/get-address-balance';
import { Request } from 'express';

@Controller({ path: '/wallet' })
export class WalletController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  createWallet(@Body() command: CreateWalletCommand): Promise<WalletDto> {
    return this.commandBus.execute(command);
  }

  @Get('/{address}')
  async getWallet(
    @Req() request: Request,
    @Param('address') address: string,
  ): Promise<WalletWithBalanceDto> {
    return this.queryBus.execute(new GetAddressBalanceQuery(address, request));
  }
}
