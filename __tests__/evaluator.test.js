import { evaluateExpression, formatResult } from '../src/logic/evaluator';

describe('evaluateExpression', () => {
  it('honours operator precedence', () => {
    expect(evaluateExpression('2 + 3 × 4')).toBe(14);
  });

  it('evaluates nested parentheses and unary negatives', () => {
    expect(evaluateExpression('-(2 + 3) × 4')).toBe(-20);
  });

  it('rejects unsafe or incomplete input with useful errors', () => {
    expect(() => evaluateExpression('2 / 0')).toThrow('Cannot divide by zero');
    expect(() => evaluateExpression('2 +')).toThrow('Missing value');
    expect(() => evaluateExpression('2; alert(1)')).toThrow('Invalid character');
  });

  it('formats floating point noise for the display', () => {
    expect(formatResult(0.1 + 0.2)).toBe('0.3');
  });
});
