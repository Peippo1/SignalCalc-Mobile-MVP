import { act, create } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useCalculator from '../src/logic/useCalculator';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

beforeEach(async () => {
  await AsyncStorage.clear();
});

async function renderHook(callback) {
  const result = {};
  const Test = () => {
    Object.assign(result, callback());
    return null;
  };
  await act(async () => {
    create(<Test />);
    await Promise.resolve();
  });
  return result;
}

describe('useCalculator', () => {
  it('appends digits and evaluates addition', async () => {
    const hook = await renderHook(() => useCalculator());

    act(() => hook.appendDigit('4'));
    act(() => hook.chooseOperator('+'));
    act(() => hook.appendDigit('6'));
    act(() => hook.performOperation());

    expect(hook.display).toBe('10');
    expect(hook.history[0]).toEqual({ expression: '4 + 6', result: '10' });
  });

  it('handles percent and toggle sign', async () => {
    const hook = await renderHook(() => useCalculator());

    act(() => hook.appendDigit('5'));
    act(() => hook.percent());
    expect(hook.display).toBe('0.05');

    act(() => hook.toggleSign());
    expect(hook.display).toBe('-0.05');
  });

  it('uses memory functions', async () => {
    const hook = await renderHook(() => useCalculator());

    act(() => hook.appendDigit('2'));
    act(() => hook.memoryAdd()); // memory = 2
    act(() => hook.appendDigit('5'));
    act(() => hook.memorySubtract()); // memory = -? (since display "25") memory = -23
    act(() => hook.memoryRecall());

    expect(hook.memory).toBe(-23);
    expect(hook.display).toBe('-23');
  });

  it('prevents evaluation when expression ends with operator', async () => {
    const hook = await renderHook(() => useCalculator());
    act(() => hook.appendDigit('3'));
    act(() => hook.chooseOperator('+'));
    expect(hook.canEvaluate).toBe(false);
  });
});
