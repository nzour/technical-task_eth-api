import { Address } from '../../../../src/wallet/entities/wallet/value_objects/address/address';
import * as E from 'fp-ts/Either';
import {
  ADDRESS_ALREADY_EXISTS,
  INVALID_ADDRESS_STRING,
} from '../../../../src/shared/errors/errorMessages';

describe('Address', () => {
  describe('canCreate', () => {
    const testCases = [
      // valid test cases
      {
        toString: () =>
          'valid address, no other addresses - should return true',
        address: '0xc1912fee45d61c87cc5ea59dae31190fffff232d',
        extraValidationData: {
          isSuchAddressAlreadyExist: false,
        },
        expected: E.right(undefined),
      },
      // invalid test cases
      {
        toString: () =>
          'invalid address, no other addresses - should return false',
        address: 'not address',
        extraValidationData: {
          isSuchAddressAlreadyExist: false,
        },
        expected: E.left([INVALID_ADDRESS_STRING]),
      },
      {
        toString: () =>
          'valid address, but other address exists - should return false',
        address: '0xc1912fee45d61c87cc5ea59dae31190fffff232d',
        extraValidationData: {
          isSuchAddressAlreadyExist: true,
        },
        expected: E.left([ADDRESS_ALREADY_EXISTS]),
      },
    ];

    test.each(testCases)('%s', ({ address, extraValidationData, expected }) => {
      const errors = Address.canCreate(address, extraValidationData);

      expect(errors).toStrictEqual(expected);
    });
  });
});
