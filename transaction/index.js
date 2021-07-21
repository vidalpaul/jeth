const uuid = require('uuid/v4');
const Account = require('../account');

const TRANSACTION_TYPE_MAP = {
  CREATE_ACCOUNT: 'CREATE_ACCOUNT',
  TRANSACT: 'TRANSACT',
};

class Transaction {
  constructor({ id, from, to, value, data, signature }) {
    this.id = id || uuid();
    this.from = from || '-';
    this.to = to || '-';
    this.value = value || 0;
    this.data = data || '-';
    this.signature = signature || '-';
  }

  // Transaction factory
  static createTransaction({ account, to, value }) {
    if (to) {
      const transactionData = {
        id: uuid(),
        from: account.address,
        to,
        value,
        data: {
          type: TRANSACTION_TYPE_MAP.TRANSACT,
        },
      };
      return new Transaction({
        ...transactionData,
        signature: account.sign(transactionData),
      });
    }
    return new Transaction({
      data: {
        type: TRANSACTION_TYPE_MAP.CREATE_ACCOUNT,
        accountData: account.toJSON(),
      },
    });
  }
}

module.exports = Transaction;

const account = new Account();
const transaction = Transaction.createTransaction({
  account,
});
console.log('transaction', transaction);
