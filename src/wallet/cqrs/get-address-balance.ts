import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EthBalance, EthService } from '../../shared/eth.service';
import { AddressBalanceRequestedEvent } from './events/address-balance-requested.event';
import { Request } from 'express';
import { AddressWithBalanceDto } from '../wallet.dto';

export class GetAddressBalanceQuery {
  constructor(
    public readonly address: string,
    public readonly request: Request,
  ) {}
}

@QueryHandler(GetAddressBalanceQuery)
export class GetAddressBalanceHandler
  implements IQueryHandler<GetAddressBalanceQuery>
{
  constructor(private ethService: EthService, private eventBus: EventBus) {}

  async execute({ address, request }: GetAddressBalanceQuery) {
    const trimmedAddress = address.trim();

    const [ethBalance, tetherBalance] = await Promise.all([
      await this.ethService.getEthBalance(trimmedAddress),
      await this.ethService.getUsdtBalance(trimmedAddress, 'fake-token'),
    ]);

    const balance: EthBalance = { ethBalance, tetherBalance };

    this.eventBus.publish(
      new AddressBalanceRequestedEvent(trimmedAddress, balance, request.ip),
    );

    return new AddressWithBalanceDto(trimmedAddress, balance);
  }
}
