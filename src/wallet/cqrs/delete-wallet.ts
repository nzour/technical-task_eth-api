import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletDeletedEvent } from './events/wallet-deleted.event';

export class DeleteWalletCommand {
  constructor(public readonly address: string) {}
}

@CommandHandler(DeleteWalletCommand)
export class DeleteWalletHandler
  implements ICommandHandler<DeleteWalletCommand>
{
  constructor(
    @InjectRepository(Wallet) private readonly repository: Repository<Wallet>,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ address }: DeleteWalletCommand): Promise<void> {
    await this.repository.delete({ address });

    this.eventBus.publish(new WalletDeletedEvent(address));
  }
}
