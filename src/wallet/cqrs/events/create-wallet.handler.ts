import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AddressBalanceRequestedEvent } from './address-balance-requested.event';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../../entities/wallet/wallet.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

/**
 * Неявное добавление кошелька в БД, в случае если по нему запросили баланс, но он ранее отсутствовал в БД.
 */
@EventsHandler(AddressBalanceRequestedEvent)
export class CreateWalletHandler
  implements IEventHandler<AddressBalanceRequestedEvent>
{
  constructor(
    @InjectRepository(Wallet)
    private readonly repository: Repository<Wallet>,
    private readonly logger: Logger,
  ) {}

  async handle({ address }: AddressBalanceRequestedEvent): Promise<void> {
    const countWallets = await this.repository.count({ where: { address } });

    if (0 !== countWallets) {
      return;
    }

    const wallet = new Wallet(address);

    try {
      await this.repository.save(wallet);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
