import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const testSum = 200;

  test('should create account with initial balance', () => {
    const account = getBankAccount(testSum);
    expect(account.getBalance()).toBe(testSum);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(testSum);
    const error = new InsufficientFundsError(testSum);
    expect(() => account.withdraw(300)).toThrow(error);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(testSum);
    const account2 = getBankAccount(testSum + 200);
    expect(() => account.transfer(testSum + 200, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(testSum);
    expect(() => account.transfer(testSum, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(testSum);
    expect(account.deposit(100).getBalance()).toEqual(300);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(testSum);
    expect(account.withdraw(100).getBalance()).toEqual(100);
  });

  test('should transfer money', () => {
    const account = getBankAccount(testSum);
    const account2 = getBankAccount(testSum);
    account.transfer(100, account2);
    expect(account.getBalance()).toEqual(100);
    expect(account2.getBalance()).toEqual(300);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(testSum);
    const balance = await account.fetchBalance();
    balance ? expect(typeof balance).toBe('number') : expect(balance).toBeNull;
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(testSum);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(testSum + 100);
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(testSum + 100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(testSum);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
