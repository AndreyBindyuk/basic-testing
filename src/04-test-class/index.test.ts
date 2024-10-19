// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(100).withdraw(200)).toThrowError(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      const account1 = getBankAccount(200);
      const account2 = getBankAccount(200);
      account1.transfer(400, account2);
    }).toThrowError('Insufficient funds: cannot withdraw more than 200');
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      const account = getBankAccount(200);
      account.transfer(100, account);
    }).toThrowError('Transfer failed');
  });

  test('should deposit money', () => {
    expect(getBankAccount(100).deposit(100).getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(100).withdraw(50).getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    expect(
      getBankAccount(200).transfer(100, getBankAccount(100)).getBalance(),
    ).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(100);
    const mockBalance = 100;
    bankAccount.fetchBalance = jest.fn().mockResolvedValue(mockBalance);

    const result = await bankAccount.fetchBalance();

    expect(result).toBe(mockBalance);
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(100);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(100);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
