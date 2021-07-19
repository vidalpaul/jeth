const { expect } = require('@jest/globals');
const { describe } = require('jest-circus');
const { sortCharacters } = require('./index');

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
});
