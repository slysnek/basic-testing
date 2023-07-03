import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 8, b: 4, action: Action.Subtract, expected: 4 },
  { a: 12, b: 2, action: Action.Subtract, expected: 10 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 7, b: 3, action: Action.Multiply, expected: 21 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 16, b: 4, action: Action.Divide, expected: 4 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
];

describe('simpleCalculator', () => {
  test('should blah-blah', () => {
    testCases.forEach((testCase) => {
      const number = simpleCalculator({
        a: testCase.a,
        b: testCase.b,
        action: testCase.action,
      });
      expect(number).toBe(testCase.expected);
    });
  });
  test.each(testCases)('($a, $action, $b)', ({ a, b, action, expected }) => {
    const number = simpleCalculator({
      a: a,
      b: b,
      action: action,
    });
    expect(number).toBe(expected);
  });
});
