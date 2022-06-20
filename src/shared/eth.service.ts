import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { ConfigService } from '@nestjs/config';

export type EthBalance = {
  ethBalance: number;
  tetherBalance: number;
};

@Injectable()
export class EthService {
  private readonly web3: Web3;

  constructor(configService: ConfigService) {
    this.web3 = new Web3(configService.get('ETH_RPC_URL'));
  }

  async getEthBalance(address: string): Promise<number> {
    const balanceWei = await this.web3.eth.getBalance(address);

    return Number(this.web3.utils.fromWei(balanceWei));
  }

  async getUsdtBalance(address: string, erc20Token: string): Promise<number> {
    return 0;
  }
}
