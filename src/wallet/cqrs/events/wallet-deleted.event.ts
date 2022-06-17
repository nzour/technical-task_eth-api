/**
 * Событие, вызываемое при удалении кошелька
 */
export class WalletDeletedEvent {
  constructor(public readonly address: string) {}
}
