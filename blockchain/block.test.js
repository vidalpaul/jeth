const { expect, it, describe, beforeEach } = require('@jest/globals');
const { keccakHash } = require('../util');
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
  describe('mine block()', () => {
    let lastBlock, minedBlock;
    beforeEach(() => {
      lastBlock = Block.genesis();
      minedBlock = Block.mineBlock({ lastBlock, beneficiary: 'beneficiary' });
    });
    it('mines a block', () => {
      expect(minedBlock).toBeInstanceOf(Block);
    });
    it('mines a block that meets the proof of work requirement', () => {
      const target = Block.calculateBlockTargetHash({ lastBlock });
      const { blockHeaders } = minedBlock;
      const { nonce } = blockHeaders;
      const truncatedBlockHeaders = { ...blockHeaders };
      delete truncatedBlockHeaders.nonce;
      const header = keccakHash(truncatedBlockHeaders);
      const underTargetHash = keccakHash(header + nonce);
      expect(underTargetHash < target).toBe(true);
    });
  });

  describe('adjustDifficulty()', () => {
    it('keeps the difficulty above zero', () => {
      expect(
        Block.adjustDifficulty({
          lastBlock: { blockHeaders: { difficulty: 0 } },
          timestamp: Date.now(),
        })
      ).toEqual(1);
    });
    it('increases the difficulty for a quickly mined block', () => {
      expect(
        Block.adjustDifficulty({
          lastBlock: { blockHeaders: { difficulty: 5, timestamp: 1000 } },
          timestamp: 3000,
        })
      ).toEqual(6);
    });
    it('decreases the difficulty for a slowly mined block', () => {
      expect(
        Block.adjustDifficulty({
          lastBlock: { blockHeaders: { difficulty: 5, timestamp: 1000 } },
          timestamp: 30000,
        })
      ).toEqual(4);
    });
  });
});
