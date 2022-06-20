import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletDto, WalletWithPrivateKey } from '../wallet.dto';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EthService } from '../../shared/eth.service';

/**
 * Создание нового аккаунта в Ethereum-сети
 */
export class CreateNewWalletCommand {}

@CommandHandler(CreateNewWalletCommand)
export class CreateNewWalletHandler implements ICommandHandler {
  constructor(
    @InjectRepository(Wallet)
    private readonly repository: Repository<Wallet>,
    private readonly ethService: EthService,
  ) {}

  async execute(): Promise<WalletWithPrivateKey> {
    const { address, privateKey } = this.ethService.createAccount();

    const wallet = new Wallet(address);
    await this.repository.save(wallet);

    const dto = WalletDto.from(wallet);

    return {
      ...dto,
      privateKey,
    };
  }
}
