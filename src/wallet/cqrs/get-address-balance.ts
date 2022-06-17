import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EthService } from '../../shared/eth.service';
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

    const balance = await this.ethService.getBalance(trimmedAddress);

    this.eventBus.publish(
      new AddressBalanceRequestedEvent(trimmedAddress, balance, request.ip),
    );

    return new AddressWithBalanceDto(trimmedAddress, balance);
  }
}
