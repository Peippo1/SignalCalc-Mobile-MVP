import { useMemo, useState } from 'react';

const MAX_HISTORY = 5;

const operatorMap = {
  '÷': '/',
  '×': '*',
  '^': '**',
};

const isOperator = (token) => ['+', '-', '×', '÷', '*', '/', '^'].includes(token);

const toJsExpression = (tokens) =>
  tokens
    .map((token) => {
      if (operatorMap[token]) return operatorMap[token];
      return token;
    })
    .join(' ');

const isSafeExpression = (expr) => /^[\d+\-*/().\s^]+$/.test(expr);

export default function useCalculator() {
  const [currentInput, setCurrentInput] = useState('0');
  const [tokens, setTokens] = useState([]);
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [error, setError] = useState('');

  const resetError = () => setError('');

  const appendDigit = (digit) => {
    resetError();
    setCurrentInput((prev) => {
      if (prev === '0' && digit !== '.') return digit;
      if (digit === '.' && prev.includes('.')) return prev;
      return prev + digit;
    });
  };

  const backspace = () => {
    resetError();
    setCurrentInput((prev) => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const clear = () => {
    setCurrentInput('0');
    setTokens([]);
    setError('');
  };

  const clearAll = () => {
    clear();
    setHistory([]);
    setMemory(null);
    setLastResult(null);
  };

  const toggleSign = () => {
    resetError();
    setCurrentInput((prev) => {
      if (prev === '0') return prev;
      return prev.startsWith('-') ? prev.slice(1) : `-${prev}`;
    });
  };

  const percent = () => {
    resetError();
    setCurrentInput((prev) => String(parseFloat(prev || '0') / 100));
  };

  const commitCurrent = (override) => {
    const value = override ?? currentInput;
    if (value == null) return;
    setTokens((prev) => [...prev, value]);
    setCurrentInput('0');
  };

  const appendParenthesis = (paren) => {
    resetError();
    if (paren === '(') {
      setTokens((prev) => [...prev, paren]);
    } else {
      commitCurrent();
      setTokens((prev) => [...prev, paren]);
    }
  };

  const chooseOperator = (op) => {
    resetError();
    commitCurrent();
    setTokens((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last && isOperator(last)) {
        next[next.length - 1] = op;
      } else if (!next.length && lastResult) {
        next.push(String(lastResult));
        next.push(op);
      } else {
        next.push(op);
      }
      return next;
    });
  };

  const performOperation = () => {
    resetError();
    const workingTokens = [...tokens];
    if (currentInput && currentInput !== '0') {
      workingTokens.push(currentInput);
    }

    if (!workingTokens.length) return currentInput;

    const jsExpression = toJsExpression(workingTokens);
    if (!isSafeExpression(jsExpression)) {
      setError('Invalid expression');
      return currentInput;
    }

    let result;
    try {
      // eslint-disable-next-line no-new-func
      result = Function(`"use strict"; return (${jsExpression});`)();
    } catch {
      setError('Error');
      return 'Error';
    }

    if (Number.isNaN(result) || !Number.isFinite(result)) {
      setError('Error');
      return 'Error';
    }

    const resultString = String(result);
    setLastResult(resultString);
    setCurrentInput(resultString);
    setTokens([]);
    setHistory((prev) => [
      { expression: workingTokens.join(' '), result: resultString },
      ...prev.slice(0, MAX_HISTORY - 1),
    ]);
    return resultString;
  };

  const recallAnswer = () => {
    if (lastResult == null) return;
    setCurrentInput(String(lastResult));
  };

  const memoryClear = () => setMemory(null);
  const memoryRecall = () => {
    if (memory == null) return;
    setCurrentInput(String(memory));
  };
  const memoryAdd = () => {
    const numeric = parseFloat(currentInput || '0');
    setMemory((prev) => (prev ?? 0) + numeric);
  };
  const memorySubtract = () => {
    const numeric = parseFloat(currentInput || '0');
    setMemory((prev) => (prev ?? 0) - numeric);
  };

  const state = useMemo(
    () => ({
      display: currentInput,
      tokens,
      history,
      memory,
      lastResult,
      error,
      appendDigit,
      clear,
      clearAll,
      chooseOperator,
      performOperation,
      toggleSign,
      percent,
      backspace,
      recallAnswer,
      memoryClear,
      memoryRecall,
      memoryAdd,
      memorySubtract,
      appendParenthesis,
    }),
    [currentInput, tokens, history, memory, lastResult, error]
  );

  return state;
}
