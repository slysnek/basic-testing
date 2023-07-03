import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const number = simpleCalculator({
      a: 3,
      b: 7,
      action: Action.Add,
    });
    expect(number).toBe(10);
  });

  test('should subtract two numbers', () => {
    const number = simpleCalculator({
      a: 10,
      b: 5,
      action: Action.Subtract,
    });
    expect(number).toBe(5);
  });

  test('should multiply two numbers', () => {
    const number = simpleCalculator({
      a: 4,
      b: 4,
      action: Action.Multiply,
    });
    expect(number).toBe(16);
  });

  test('should divide two numbers', () => {
    const number = simpleCalculator({
      a: 8,
      b: 2,
      action: Action.Divide,
    });
    expect(number).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const number = simpleCalculator({
      a: 2,
      b: 5,
      action: Action.Exponentiate,
    });
    expect(number).toBe(32);
  });

  test('should return null for invalid action', () => {
    const number = simpleCalculator({
      a: 4,
      b: 4,
      action: 'рыбий жыр',
    });
    expect(number).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const number = simpleCalculator({
      a: 'aaaaaa',
      b: null,
      action: Action.Multiply,
    });
    expect(number).toBe(null);
  });
});
