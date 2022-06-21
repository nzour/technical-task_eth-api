import { Column, Index } from 'typeorm';
import { isAddress } from 'web3-utils';
import { CannotCreateAddressError } from '../../../../../shared/errors/cannotCreateAddressError';
import { ExtraAddressValidationData } from './types/extraAddressValidationData';
import { Either } from 'fp-ts/Either';
import * as E from 'fp-ts/Either';
import {
  ADDRESS_ALREADY_EXISTS,
  INVALID_ADDRESS_STRING,
} from '../../../../../shared/errors/errorMessages';

export class Address {
  @Index({ unique: true })
  @Column({ name: 'address' })
  readonly address: string;

  constructor(
    address: string,
    extraValidationData: ExtraAddressValidationData,
  ) {
    const result = Address.canCreate(address, extraValidationData);

    if (E.isLeft(result)) {
      throw new CannotCreateAddressError(result.left);
    }

    this.address = address;
  }

  public static canCreate(
    address: string,
    extraValidationData: ExtraAddressValidationData,
  ): Either<string[], undefined> {
    const errors: string[] = [];

    if (!isAddress(address)) {
      errors.push(INVALID_ADDRESS_STRING);
    }

    if (extraValidationData.isSuchAddressAlreadyExist) {
      errors.push(ADDRESS_ALREADY_EXISTS);
    }

    if (errors.length > 0) {
      return E.left(errors);
    }

    return E.right(undefined);
  }
}
