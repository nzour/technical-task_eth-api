export class CannotCreateAddressError extends Error {
  constructor(messages: string[]) {
    const message = `CannotCreateAddressError: ${JSON.stringify(messages)}`;
    super(message);
  }
}
