import { Injectable } from '@nestjs/common';

export type Balance = {
  eth: number;
  usdt: number;
};

@Injectable()
export class EthService {
  async getBalance(address: string): Promise<Balance> {
    return { eth: 0, usdt: 0 }; // fixme
  }
}
