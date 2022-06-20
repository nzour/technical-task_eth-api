import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EthBalance, EthService } from '../../shared/eth.service';
import { AddressBalanceRequestedEvent } from './events/address-balance-requested.event';
import { AddressWithBalanceDto } from '../wallet.dto';

export class GetAddressBalanceQuery {
  constructor(
    public readonly address: string,
    public readonly requestIp: string,
  ) {}
}

@QueryHandler(GetAddressBalanceQuery)
export class GetAddressBalanceHandler
  implements IQueryHandler<GetAddressBalanceQuery>
{
  constructor(private ethService: EthService, private eventBus: EventBus) {}

  async execute({ address, requestIp }: GetAddressBalanceQuery) {
    const trimmedAddress = address.trim();

    const [ethBalance, tetherBalance] = await Promise.all([
      await this.ethService.getEthBalance(trimmedAddress),
      await this.ethService.getUsdtBalance(trimmedAddress, 'fake-token'),
    ]);

    const balance: EthBalance = { ethBalance, tetherBalance };

    this.eventBus.publish(
      new AddressBalanceRequestedEvent(trimmedAddress, balance, requestIp),
    );

    return new AddressWithBalanceDto(trimmedAddress, balance);
  }
}
