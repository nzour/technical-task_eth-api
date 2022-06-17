import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddressWithBalanceDto, WalletDto } from './wallet.dto';
import { CreateWalletCommand } from './cqrs/create-wallet';
import { GetAddressBalanceQuery } from './cqrs/get-address-balance';
import { Request } from 'express';
import { DeleteWalletCommand } from './cqrs/delete-wallet';

@Controller({ path: '/wallets' })
export class WalletController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  createWallet(@Body() command: CreateWalletCommand): Promise<WalletDto> {
    return this.commandBus.execute(command);
  }

  @Delete('/:address')
  deleteWallet(@Param('address') address: string): Promise<void> {
    return this.commandBus.execute(new DeleteWalletCommand(address));
  }

  @Get()
  getWallet(
    @Req() request: Request,
    @Query('address') address: string,
  ): Promise<AddressWithBalanceDto> {
    return this.queryBus.execute(new GetAddressBalanceQuery(address, request));
  }
}
