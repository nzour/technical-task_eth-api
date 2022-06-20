import { Wallet } from './entities/wallet.entity';
import { EthBalance } from '../shared/eth.service';

export class WalletDto {
  constructor(public readonly id: string, public readonly address: string) {}

  static from(entity: Wallet): WalletDto {
    return new WalletDto(entity.id, entity.address);
  }
}

export type WalletWithPrivateKey = WalletDto & { privateKey: string };

export class AddressWithBalanceDto {
  constructor(
    public readonly address: string,
    public readonly balance: EthBalance,
  ) {}
}

export class AddressWithEthBalanceDto {
  constructor(
    public readonly address: string,
    public readonly ethBalance: number,
  ) {}
}
