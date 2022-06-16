import { Balance } from '../../../shared/eth.service';

/**
 * Событие, вызываемое при запросе баланса по адресу кошелька.
 */
export class AddressBalanceRequestedEvent {
  constructor(
    public readonly address: string,
    public readonly balance: Balance,
    public readonly requestIp: string,
  ) {}
}
