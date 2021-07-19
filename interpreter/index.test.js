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
  });
});
