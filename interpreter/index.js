const STOP = 'STOP';
const ADD = 'ADD';
const SUB = 'SUB';
const MUL = 'MUL';
const DIV = 'DIV';
const PUSH = 'PUSH';

const code = [PUSH, 2, PUSH, 7, ADD, STOP];

class Intepreter {
  constructor() {
    this.state = {
      programCounter: 0,
      stack: [],
      code: [],
    };
  }

  runCode(code) {
    this.state.code = code;

    while (this.state.programCounter < this.state.code.length) {
      const opCode = this.state.code[this.state.programCounter];
      try {
        switch (opCode) {
          case STOP:
            throw new Error('Execution is complete');
          case PUSH:
            this.state.programCounter++;
            const value = this.state.code[this.state.programCounter];
            this.state.stack.push(value);
            break;
          case ADD:
            let a = this.state.stack.pop();
            let b = this.state.stack.pop();
            this.state.stack.push(a + b);
            break;
          case SUB:
            let a = this.state.stack.pop();
            let b = this.state.stack.pop();
            this.state.stack.push(a - b);
            break;
          case MUL:
            let a = this.state.stack.pop();
            let b = this.state.stack.pop();
            this.state.stack.push(a * b);
            break;
          case DIV:
            let a = this.state.stack.pop();
            let b = this.state.stack.pop();
            this.state.stack.push(a / b);
            break;
          default:
            break;
        }
      } catch (error) {
        return this.state.stack[this.state.stack.length - 1];
      }

      this.state.programCounter++;
    }
  }
}

const intepreter = new Intepreter();
intepreter.runCode(code);
