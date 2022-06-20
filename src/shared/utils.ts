import { isAddress } from 'web3-utils';
import { UnprocessableEntityException } from '@nestjs/common';

export function assertValidAddress(address: string): void {
  if (isAddress(address)) {
    return;
  }

  throw new UnprocessableEntityException(
    'Specified account address is invalid',
  );
}
