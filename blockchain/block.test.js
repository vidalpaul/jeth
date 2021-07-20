const { expect, it, describe } = require('@jest/globals');
const Block = require('./block');

describe('Block', () => {
  describe('calculateBlockTargetHash()', () => {
    it('calculates the maximum hash when the last block difficulty is 1', () => {
      expect(
        Block.calculateBlockTargetHash({
          lastBlock: { blockHeaders: { difficulty: 1 } },
        })
      ).toEqual('f'.repeat(64));
    });
    it('calculates a low hash value when the last block difficulty is high', () => {
      expect(
        Block.calculateBlockTargetHash({
          lastBlock: { blockHeaders: { difficulty: 5000 } },
        }) < '1'
      ).toBe(true);
    });
  });
});
