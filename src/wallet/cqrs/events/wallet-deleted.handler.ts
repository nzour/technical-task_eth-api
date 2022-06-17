import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WalletDeletedEvent } from './wallet-deleted.event';
import { Repository } from 'typeorm';
import { AddressBalanceLog } from '../../entities/address-balance-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';

@EventsHandler(WalletDeletedEvent)
export class WalletDeletedHandler implements IEventHandler<WalletDeletedEvent> {
  constructor(
    @InjectRepository(AddressBalanceLog)
    private readonly repository: Repository<AddressBalanceLog>,
    private readonly logger: Logger,
  ) {}

  async handle({ address }: WalletDeletedEvent): Promise<void> {
    try {
      await this.repository.delete({ address });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
