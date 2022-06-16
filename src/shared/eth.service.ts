import { Injectable } from '@nestjs/common';

export type EthBalance = {
  eth: number;
  usdt: number;
};

@Injectable()
export class EthService {
  async getBalance(address: string): Promise<EthBalance> {
    return { eth: 0, usdt: 0 }; // fixme
  }
}
