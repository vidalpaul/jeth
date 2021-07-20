const { GENESIS_DATA } = require('../config');
const { keccakHash } = require('../util');

const HASH_LENGTH = 64;
const MAX_HASH_VALUE = parseInt('f'.repeat(HASH_LENGTH), 16);
const MAX_NONCE_VALUE = 2 ** 64;

class Block {
  constructor({ blockHeaders }) {
    this.blockHeaders = blockHeaders;
  }

  static calculateBlockTargetHash({ lastBlock }) {
    const value = (MAX_HASH_VALUE / lastBlock.blockHeaders.difficulty).toString(
      16
    );
    if (value.length > HASH_LENGTH) {
      return 'f'.repeat(HASH_LENGTH);
    }
    return '0'.repeat(HASH_LENGTH - value.length) + value;
  }

  static mineBlock({ lastBlock, beneficiary }) {
    const target = Block.calculateBlockTargetHash({ lastBlock });
    let timestamp, truncatedBlockHeaders, header, nonce, underTargetHash;

    do {
      timestamp = Date.now();
      truncatedBlockHeaders = {
        parentHash: keccakHash(lastBlock.blockHeaders),
        beneficiary,
        difficulty: lastBlock.blockHeaders.difficulty + 1,
        number: lastBlock.blockHeaders.number + 1,
        timestamp,
      };
      header = keccakHash(truncatedBlockHeaders);
      nonce = Math.floor(Math.random() * MAX_NONCE_VALUE);

      underTargetHash = keccakHash(header + nonce);
    } while (underTargetHash > target);

    console.log('underTargetHash: ', underTargetHash);
    console.log('target: ', target);

    return new this({
      blockHeaders: {
        ...truncatedBlockHeaders,
        nonce,
      },
    });
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }
}

module.exports = Block;

const block = Block.mineBlock({
  lastBlock: Block.genesis(),
  beneficiary: 'foo',
});

console.log('block ', block);
