import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AddressBalanceRequestedEvent } from './address-balance-requested.event';
import { Repository } from 'typeorm';
import { AddressBalanceLog } from '../../entities/address-balance.log';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';

/**
 * Логирование запрошенного баланса в БД.
 */
@EventsHandler(AddressBalanceRequestedEvent)
export class LogAddressBalanceHandler
  implements IEventHandler<AddressBalanceRequestedEvent>
{
  constructor(
    @InjectRepository(AddressBalanceLog)
    private readonly repository: Repository<AddressBalanceLog>,
    private readonly logger: Logger,
  ) {}

  async handle({ address, requestIp, balance }: AddressBalanceRequestedEvent) {
    const logEntity = new AddressBalanceLog(
      address,
      requestIp,
      balance.eth,
      balance.usdt,
    );

    try {
      await this.repository.save(logEntity);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
