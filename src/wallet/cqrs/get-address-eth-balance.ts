import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AddressWithEthBalanceDto } from '../wallet.dto';
import { EthService } from '../../shared/eth.service';
import { AddressBalanceRequestedEvent } from './events/address-balance-requested.event';
import { assertValidAddress } from '../../shared/utils';

export class GetAddressEthBalanceQuery {
  constructor(
    public readonly address: string,
    public readonly requestIp: string,
  ) {}
}

@QueryHandler(GetAddressEthBalanceQuery)
export class GetAddressEthBalanceHandler
  implements IQueryHandler<GetAddressEthBalanceQuery>
{
  constructor(private ethService: EthService, private eventBus: EventBus) {}

  async execute({ address, requestIp }: GetAddressEthBalanceQuery) {
    const trimmedAddress = address.trim();

    assertValidAddress(trimmedAddress);

    const ethBalance = await this.ethService.getEthBalance(trimmedAddress);

    this.eventBus.publish(
      new AddressBalanceRequestedEvent(
        trimmedAddress,
        { ethBalance, tetherBalance: 0 },
        requestIp,
      ),
    );

    return new AddressWithEthBalanceDto(trimmedAddress, ethBalance);
  }
}
