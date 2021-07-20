const { expect, it } = require('@jest/globals');
const { describe } = require('jest-circus');
const { sortCharacters, keccakHash } = require('./index');

describe('util', () => {
  describe('sortCharacters()', () => {
    it('checks if it creates the same string for objects with the same properties in a different order', () =>
      expect(sortCharacters({ foo: 'foo', bar: 'bar' })).toEqual(
        sortCharacters({ bar: 'bar', foo: 'foo' })
      ));
    it('checks if it creates a different string for objects with different properties', () =>
      expect(sortCharacters({ foo: 'foo' })).not.toEqual(
        sortCharacters({ bar: 'bar' })
      ));
  });
  describe('keccakHash()', () => {
    it('produces a keccak256 hash', () => {
      expect(keccakHash('foo')).toEqual(
        'b2a7ad9b4a2ee6d984cc5c2ad81d0c2b2902fa410670aa3f2f4f668a1f80611c'
      );
    });
  });
});
