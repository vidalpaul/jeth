const { expect, it } = require('@jest/globals');
const Interpreter = require('./index');

const { STOP, ADD, SUB, MUL, DIV, PUSH, LT, GT, EQ, AND, OR, JUMP, JUMPI } =
  Interpreter.OPCODE_MAP;

describe('Interpreter', () => {
  describe('runCode()', () => {
    describe('and the code includes ADD', () => {
      it('adds two values', () => {
        expect(
          new Interpreter().runCode([PUSH, 2, PUSH, 3, ADD, STOP])
        ).toEqual(5);
      });
    });

    describe('and the code includes SUB', () => {
      it('subtracts two values', () => {
        expect(
          new Interpreter().runCode([PUSH, 2, PUSH, 3, SUB, STOP])
        ).toEqual(1);
      });
    });

    describe('and the code includes MUL', () => {
      it('multiplies two values', () => {
        expect(
          new Interpreter().runCode([PUSH, 2, PUSH, 3, MUL, STOP])
        ).toEqual(6);
      });
    });

    describe('and the code includes DIV', () => {
      it('divides two values', () => {
        expect(
          new Interpreter().runCode([PUSH, 2, PUSH, 3, DIV, STOP])
        ).toEqual(1.5);
      });
    });

    describe('and the code includes LT', () => {
      it('checks if one values is less than another', () => {
        expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, LT, STOP])).toEqual(
          0
        );
      });
    });

    describe('and the code includes GT', () => {
      it('checks if one values is grater than another', () => {
        expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, GT, STOP])).toEqual(
          1
        );
      });
    });

    describe('and the code includes EQ', () => {
      it('checks if two values are equal', () => {
        expect(new Interpreter().runCode([PUSH, 2, PUSH, 2, EQ, STOP])).toEqual(
          1
        );
      });
    });

    describe('and the code includes AND', () => {
      it('checks if one values is grater than another', () => {
        expect(
          new Interpreter().runCode([PUSH, 1, PUSH, 0, AND, STOP])
        ).toEqual(0);
      });
    });

    describe('and the code includes OR', () => {
      it('checks if one values is grater than another', () => {
        expect(new Interpreter().runCode([PUSH, 1, PUSH, 0, OR, STOP])).toEqual(
          1
        );
      });
    });
  });
});
