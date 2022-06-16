import { Wallet } from './entities/wallet.entity';
import { EthBalance } from '../shared/eth.service';

export class WalletDto {
  constructor(public readonly id: string, public readonly address: string) {}

  static from(entity: Wallet): WalletDto {
    return new WalletDto(entity.id, entity.address);
  }
}

export class WalletWithBalanceDto {
  constructor(
    public readonly wallet: WalletDto,
    public readonly balance: EthBalance,
  ) {}
}
