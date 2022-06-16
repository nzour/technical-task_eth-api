import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'crypto';

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryColumn({ type: 'uuid' })
  readonly id: string;

  @Index({ unique: true })
  @Column()
  readonly address: string;

  constructor(address: string) {
    this.id = randomUUID();
    this.address = address;
  }
}
