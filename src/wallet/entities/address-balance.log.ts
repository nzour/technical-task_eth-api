import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'crypto';

@Entity({ name: 'address_balancee_logs' })
export class AddressBalanceLog {
  @PrimaryColumn({ type: 'uuid' })
  readonly id: string;

  @Column()
  readonly createdAt: Date;

  @Index()
  @Column()
  readonly address: string;

  @Column()
  readonly ip: string;

  @Column(() => Balance)
  readonly balance: Balance;

  constructor(address: string, ip: string, eth: number, usdt: number) {
    this.id = randomUUID();
    this.createdAt = new Date();
    this.address = address;
    this.ip = ip;
    this.balance = new Balance(eth, usdt);
  }
}

class Balance {
  @Column()
  readonly eth: number;

  @Column()
  readonly usdt: number;

  constructor(eth: number, usdt: number) {
    this.eth = eth;
    this.usdt = usdt;
  }
}
