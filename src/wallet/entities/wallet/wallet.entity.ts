import { Column, Entity, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'crypto';
import { Address } from './value_objects/address/address';
import { ExtraWalletValidationData } from './types/extraWalletValidationData';

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryColumn({ type: 'uuid' })
  readonly id: string;

  @Column(() => Address)
  readonly address: Address;

  constructor(
    address: string,
    extraWalletValidationData: ExtraWalletValidationData,
  ) {
    this.id = randomUUID();
    this.address = new Address(
      address,
      extraWalletValidationData.extraAddressValidationData,
    );
  }
}
