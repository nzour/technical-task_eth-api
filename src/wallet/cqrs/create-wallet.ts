import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletDto } from '../wallet.dto';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { assertValidAddress } from '../../shared/utils';

/**
 * Регистрация в системе уже существующего в Ethereum-сети адреса
 */
export class CreateWalletCommand {
  constructor(public readonly address: string) {}
}

@CommandHandler(CreateWalletCommand)
export class CreateWalletHandler
  implements ICommandHandler<CreateWalletCommand>
{
  constructor(
    @InjectRepository(Wallet) private repository: Repository<Wallet>,
  ) {}

  async execute({ address }: CreateWalletCommand): Promise<WalletDto> {
    const trimmedAddress = address.trim();

    assertValidAddress(trimmedAddress);
    await this.assertAddressDoesNotExist(trimmedAddress);

    const wallet = new Wallet(trimmedAddress);
    await this.repository.save(wallet);

    return WalletDto.from(wallet);
  }

  private async assertAddressDoesNotExist(address: string): Promise<void> {
    const existingCount = await this.repository.count({
      where: {
        address: address.trim(),
      },
    });

    if (existingCount) {
      throw new BadRequestException(`Address ${address} is already in use`);
    }
  }
}
