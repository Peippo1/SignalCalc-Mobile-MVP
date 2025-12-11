import React, { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import CalculatorButton from '../components/CalculatorButton';
import useCalculator from '../logic/useCalculator';

export default function CalculatorScreen() {
  const {
    display,
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
    canEvaluate,
  } = useCalculator();

  const [copied, setCopied] = useState(false);

  const expressionPreview = useMemo(() => [...tokens, display].join(' '), [tokens, display]);

  const handleCopy = async () => {
    const valueToCopy = error || display || '0';
    console.log('[SignalCalcMobile] Copy disabled for now:', valueToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const renderButton = (label, onPress, variant = 'digit', extra = {}) => (
    <CalculatorButton
      key={label}
      label={label}
      onPress={onPress}
      onLongPress={extra.onLongPress}
      accessibilityLabel={extra.accessibilityLabel}
      disabled={extra.disabled}
      variant={variant}
      {...extra}
    />
  );

  const rows = [
    [
      renderButton('MC', memoryClear, 'accent'),
      renderButton('MR', memoryRecall, 'accent'),
      renderButton('M+', memoryAdd, 'accent'),
      renderButton('M-', memorySubtract, 'accent'),
    ],
    [
      renderButton('C', clearAll, 'action'),
      renderButton('⌫', backspace, 'action', { onLongPress: clear }),
      renderButton('(', () => appendParenthesis('('), 'ghost'),
      renderButton(')', () => appendParenthesis(')'), 'ghost'),
    ],
    [
      renderButton('7', () => appendDigit('7')),
      renderButton('8', () => appendDigit('8')),
      renderButton('9', () => appendDigit('9')),
      renderButton('÷', () => chooseOperator('÷'), 'operator'),
    ],
    [
      renderButton('4', () => appendDigit('4')),
      renderButton('5', () => appendDigit('5')),
      renderButton('6', () => appendDigit('6')),
      renderButton('×', () => chooseOperator('×'), 'operator'),
    ],
    [
      renderButton('1', () => appendDigit('1')),
      renderButton('2', () => appendDigit('2')),
      renderButton('3', () => appendDigit('3')),
      renderButton('-', () => chooseOperator('-'), 'operator'),
    ],
    [
      renderButton('±', toggleSign, 'action'),
      renderButton('0', () => appendDigit('0')),
      renderButton('.', () => appendDigit('.')),
      renderButton('+', () => chooseOperator('+'), 'operator'),
    ],
    [
      renderButton('Ans', recallAnswer, 'operator'),
      renderButton('%', percent, 'action'),
      renderButton('=', performOperation, 'action', { flex: 2, disabled: !canEvaluate }),
    ],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Accessible Calculator</Text>
          <Text style={styles.title}>Signal Calculator</Text>
          <Text style={styles.subtitle}>
            Keyboard first, screen-reader friendly, with history and memory keys.
          </Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Default Theme</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.calculatorCard}>
          <View style={styles.displayCard}>
            <View style={styles.displayMeta}>
              <Text style={styles.metaLabel}>≈</Text>
              <Text style={styles.metaValue} numberOfLines={1} adjustsFontSizeToFit>
                {expressionPreview || '0'}
              </Text>
            </View>
            <View style={styles.displayRow}>
              <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
                {error || display}
              </Text>
              <Pressable accessibilityRole="button" accessibilityLabel="Copy result" onPress={handleCopy} style={styles.copyPill}>
                <Text style={styles.copyText}>{copied ? 'Copied' : 'Copy'}</Text>
              </Pressable>
            </View>
            <View style={styles.displayMeta}>
              <Text style={styles.metaLabel}>Memory</Text>
              <Text style={styles.metaValue}>{memory == null ? '—' : memory}</Text>
            </View>
          </View>

          <View style={styles.pad}>
            {rows.map((row, idx) => (
              <View key={`row-${idx}`} style={styles.row}>
                {row}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>History</Text>
            <Text style={styles.historySubtitle}>Last 5 calculations</Text>
          </View>
          <ScrollView style={styles.historyList}>
            {history.length === 0 && <Text style={styles.historyEmpty}>No history yet</Text>}
            {history.map((item, index) => (
              <View key={`${item.expression}-${index}`} style={styles.historyItem}>
                <Text style={styles.historyExpression} numberOfLines={1}>
                  {index + 1}. {item.expression}
                </Text>
                <Text style={styles.historyResult}>= {item.result}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kicker: {
    color: '#8b95b7',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    color: '#f5f7fb',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#cfd4e6',
    fontSize: 14,
    marginTop: 4,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#374268',
    backgroundColor: '#0b1224',
  },
  pillText: {
    color: '#cfd4e6',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },
  calculatorCard: {
    flex: 2,
    backgroundColor: '#0b1022',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#232c4a',
    padding: 14,
    gap: 12,
  },
  displayCard: {
    backgroundColor: '#0f162b',
    borderRadius: 14,
    padding: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: '#1f2a48',
  },
  displayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  result: {
    color: '#f5f7fb',
    fontSize: 44,
    fontWeight: '800',
    textAlign: 'right',
    flex: 1,
  },
  copyPill: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374268',
    backgroundColor: '#0b1224',
  },
  copyText: {
    color: '#cfd4e6',
    fontSize: 12,
    fontWeight: '600',
  },
  displayMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    color: '#6f7a9f',
    fontSize: 14,
    fontWeight: '600',
  },
  metaValue: {
    color: '#cfd4e6',
    fontSize: 14,
    textAlign: 'right',
    flex: 1,
    marginLeft: 8,
  },
  pad: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyCard: {
    flex: 1,
    backgroundColor: '#0b1022',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#3b2f1a',
    padding: 14,
    gap: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyTitle: {
    color: '#f5f7fb',
    fontSize: 20,
    fontWeight: '700',
  },
  historySubtitle: {
    color: '#cfd4e6',
    fontSize: 12,
  },
  historyList: {
    flex: 1,
  },
  historyItem: {
    marginBottom: 12,
  },
  historyExpression: {
    color: '#cfd4e6',
    fontSize: 14,
    marginBottom: 2,
  },
  historyResult: {
    color: '#8b95b7',
    fontSize: 13,
  },
  historyEmpty: {
    color: '#6f7a9f',
    fontSize: 14,
  },
});
