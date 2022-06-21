import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletDto } from '../wallet.dto';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { ExtraWalletValidationData } from '../entities/wallet/types/extraWalletValidationData';
import { Address } from '../entities/wallet/value_objects/address/address';
import { isLeft } from 'fp-ts/Either';

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
    address = address.trim();

    const validationData = await this.getExtraWalletValidationData(address);

    this.assertCanCreate(address, validationData);

    const wallet = new Wallet(address, validationData);
    await this.repository.save(wallet);

    return WalletDto.from(wallet);
  }

  private async getExtraWalletValidationData(
    address: string,
  ): Promise<ExtraWalletValidationData> {
    const [existingCount] = await Promise.all([
      this.repository.count({
        where: {
          address: address.trim(),
        },
      }),
    ]);

    return {
      extraAddressValidationData: {
        isSuchAddressAlreadyExist: existingCount > 0,
      },
    };
  }

  private assertCanCreate(
    address: string,
    extraWalletValidationData: ExtraWalletValidationData,
  ): void {
    const result = Address.canCreate(
      address,
      extraWalletValidationData.extraAddressValidationData,
    );

    if (isLeft(result)) {
      throw new BadRequestException(
        `Cannot create wallet: ${JSON.stringify(result.left)}`,
      );
    }
  }
}
