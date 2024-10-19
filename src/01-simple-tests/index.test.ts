import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 7, action: Action.Add });
    expect(result).toBe(14);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 7, action: Action.Subtract });
    expect(result).toBe(0);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 7, action: Action.Multiply });
    expect(result).toBe(49);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 14, b: 7, action: Action.Divide });
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(27);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 7, b: 7, action: 'invalid' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '7', b: 7, action: Action.Add });
    expect(result).toBeNull();
  });
});
