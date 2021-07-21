const Transaction = require('.');
const Account = require('../account');

describe('Transaction', () => {
  let account, standardTransaction, createAccountTransaction;
  beforeEach(() => {
    account = new Account();
    standardTransaction = Transaction.createTransaction({
      account,
      to: 'foo-recipient',
      value: 50,
    });
    createAccountTransaction = Transaction.createTransaction({
      account,
    });
  });
  describe('validateStandardTransaction', () => {
    it('validates a valid a transaction', () => {
      expect(
        Transaction.validateStandardTransaction({
          transaction: standardTransaction,
        })
      ).resolves;
    });
    it('does not validate a malformed a transaction', () => {
      standardTransaction.to = 'different-recipiend';
      expect(
        Transaction.validateStandardTransaction({
          transaction: standardTransaction,
        })
      ).rejects.toMatchObject({ message: /invalid/ });
    });
  });
  describe('validateAccountTransaction', () => {
    it('validates a valid create account transaction', () => {
      expect(
        Transaction.validateCreateAccountTransaction({
          transaction: createAccountTransaction,
        })
      ).resolves;
    });
    it('does not validate a malformed create account transaction', () => {
      expect(
        Transaction.validateCreateAccountTransaction({
          transaction: standardTransaction,
        })
      ).rejects.toMatchObject({ message: /incorrect/ });
    });
  });
});
