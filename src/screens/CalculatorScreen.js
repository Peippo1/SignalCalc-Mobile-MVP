import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CalculatorButton from '../components/CalculatorButton';
import useCalculator from '../logic/useCalculator';

export default function CalculatorScreen() {
  const {
    display,
    tokens,
    history,
    memory,
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

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const layoutScale = clamp(height / 900, 0.82, 1);
  const paddedWidth = Math.max(width - 32, 280);

  // Header / typography sizing.
  const titleSize = Math.round(28 * layoutScale);
  const subtitleSize = Math.max(11, Math.round(14 * layoutScale));
  const kickerSize = Math.round(12 * layoutScale);
  const resultSize = Math.round(44 * layoutScale);

  // Spacing
  const containerPadH = Math.round(16 * layoutScale);
  const containerPadTop = Math.round(16 * layoutScale);
  const containerPadBottom = Math.max(6, Math.round(10 * layoutScale));
  const cardPad = Math.round(14 * layoutScale);
  const cardGap = Math.max(8, Math.round(12 * layoutScale));
  const padGap = Math.max(4, Math.round(8 * layoutScale));
  const headerSpacing = Math.max(10, Math.round(14 * layoutScale));

  // Button chrome / header buttons
  const headerButtonHPad = Math.max(10, Math.round(12 * layoutScale));
  const headerButtonVPad = Math.max(6, Math.round(8 * layoutScale));
  const headerButtonRadius = Math.max(12, Math.round(14 * layoutScale));

  const buttonMargin = Math.max(3, Math.round(6 * layoutScale));
  const buttonLabelSize = Math.max(13, Math.round(16 * layoutScale));

  const [copied, setCopied] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [showTheme, setShowTheme] = useState(false);

  const sideHistoryWidth = Math.min(width * 0.38, 360);
  const contentWidth = Math.max(
    paddedWidth -
      containerPadH * 2 -
      cardPad * 2 -
      (isLandscape && isHistoryOpen ? sideHistoryWidth + cardGap : 0),
    240,
  );
  const padWidth = contentWidth * layoutScale;

  const displayPad = Math.max(10, Math.round(14 * layoutScale));
  const displayGap = Math.max(6, Math.round(8 * layoutScale));
  const metaSize = Math.max(12, Math.round(14 * layoutScale));
  const historyMaxHeight = Math.max(140, Math.round(height * 0.28 * layoutScale));
  const historyPad = Math.max(10, Math.round(12 * layoutScale));
  const buttonSize = Math.max(42, (padWidth - padGap * 3) / 4);

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
      margin={buttonMargin}
      labelSize={buttonLabelSize}
      size={buttonSize}
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

  const displaySection = (
    <View style={[styles.displayCard, { padding: displayPad, gap: displayGap }]}>
      <View style={styles.displayMeta}>
        <Text style={[styles.metaLabel, { fontSize: metaSize }]}>≈</Text>
        <Text style={[styles.metaValue, { fontSize: metaSize }]} numberOfLines={1} adjustsFontSizeToFit>
          {expressionPreview || '0'}
        </Text>
      </View>

      <View style={styles.displayRow}>
        <Text style={[styles.result, { fontSize: resultSize }]} numberOfLines={1} adjustsFontSizeToFit>
          {error || display}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Copy result"
          onPress={handleCopy}
          style={[
            styles.copyPill,
            {
              paddingHorizontal: Math.max(8, Math.round(10 * layoutScale)),
              paddingVertical: Math.max(5, Math.round(6 * layoutScale)),
              borderRadius: Math.max(10, Math.round(12 * layoutScale)),
            },
          ]}
        >
          <Text style={[styles.copyText, { fontSize: Math.max(11, Math.round(12 * layoutScale)) }]}>
            {copied ? 'Copied' : 'Copy'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.displayMeta}>
        <Text style={[styles.metaLabel, { fontSize: metaSize }]}>Memory</Text>
        <Text style={[styles.metaValue, { fontSize: metaSize }]}>{memory == null ? '—' : memory}</Text>
      </View>
    </View>
  );

  const keypad = (
    <View style={[styles.pad, { gap: padGap }]}>
      {rows.map((row, idx) => (
        <View key={`row-${idx}`} style={[styles.row, { gap: padGap }]}>
          {row}
        </View>
      ))}
    </View>
  );

  const renderHistoryPanel = (position = 'below') => {
    if (!isHistoryOpen) return null;
    const side = position === 'side';
    const spacing = Math.max(6, Math.round(8 * layoutScale));
    const sideListMaxHeight = Math.max(
      historyMaxHeight,
      height - containerPadTop - containerPadBottom - headerSpacing * 3,
    );

    return (
      <View
        style={[
          styles.historyCardInline,
          side ? styles.historySide : styles.historyPortrait,
          {
            padding: historyPad,
            gap: spacing,
            width: side ? sideHistoryWidth : '100%',
            maxHeight: side ? undefined : historyMaxHeight,
          },
        ]}
      >
        <View style={styles.historyHeader}>
          <Text style={[styles.historyTitle, { fontSize: Math.round(20 * layoutScale) }]}>History</Text>
          <Text style={[styles.historySubtitle, { fontSize: Math.max(11, Math.round(12 * layoutScale)) }]}>
            Last 5 calculations
          </Text>
        </View>

        <ScrollView
          style={[
            styles.historyList,
            side ? { maxHeight: sideListMaxHeight } : { maxHeight: historyMaxHeight },
          ]}
          contentContainerStyle={styles.historyListContent}
          showsVerticalScrollIndicator={false}
        >
          {history.length === 0 && (
            <Text style={[styles.historyEmpty, { fontSize: Math.max(13, Math.round(14 * layoutScale)) }]}>
              No history yet
            </Text>
          )}
          {history.map((item, index) => (
            <View key={`${item.expression}-${index}`} style={[styles.historyItem, { marginBottom: spacing }]}>
              <Text style={[styles.historyExpression, { fontSize: Math.max(13, Math.round(14 * layoutScale)) }]} numberOfLines={1}>
                {index + 1}. {item.expression}
              </Text>
              <Text style={[styles.historyResult, { fontSize: Math.max(12, Math.round(13 * layoutScale)) }]}>
                = {item.result}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const themeCard = showTheme ? (
    <View
      style={[
        styles.themeCardInline,
        {
          padding: historyPad,
          gap: Math.max(6, Math.round(8 * layoutScale)),
        },
      ]}
    >
      <View style={styles.historyHeader}>
        <Text style={[styles.historyTitle, { fontSize: Math.round(20 * layoutScale) }]}>Theme</Text>
        <Text style={[styles.historySubtitle, { fontSize: Math.max(11, Math.round(12 * layoutScale)) }]}>
          Coming soon
        </Text>
      </View>
      <Text style={[styles.themeHint, { fontSize: Math.max(12, Math.round(13 * layoutScale)) }]}>
        We’ll add selectable themes here (and persist your choice).
      </Text>
    </View>
  ) : null;

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: containerPadTop, paddingHorizontal: containerPadH, paddingBottom: containerPadBottom },
      ]}
    > 
      <View style={[styles.header, { marginBottom: headerSpacing }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.kicker, { fontSize: kickerSize }]}>Accessible Calculator</Text>
          <Text style={[styles.title, { fontSize: titleSize }]}>Signal Calculator</Text>
          <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>
            Keyboard first, screen-reader friendly, with history and memory keys.
          </Text>
        </View>

        <View style={styles.headerActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isHistoryOpen ? 'Hide history' : 'Show history'}
            onPress={() => setIsHistoryOpen((v) => !v)}
            style={({ pressed }) => [
              styles.headerButton,
              {
                paddingHorizontal: headerButtonHPad,
                paddingVertical: headerButtonVPad,
                borderRadius: headerButtonRadius,
              },
              pressed && styles.headerButtonPressed,
            ]}
          >
            <Text style={styles.headerButtonText}>History</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={showTheme ? 'Hide theme options' : 'Show theme options'}
            onPress={() => setShowTheme((v) => !v)}
            style={({ pressed }) => [
              styles.headerButton,
              {
                paddingHorizontal: headerButtonHPad,
                paddingVertical: headerButtonVPad,
                borderRadius: headerButtonRadius,
              },
              pressed && styles.headerButtonPressed,
            ]}
          >
            <Text style={styles.headerButtonText}>Theme</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.calculatorCard, { padding: cardPad, gap: cardGap }]}> 
        {isLandscape ? (
          <View style={[styles.landscapeLayout, { gap: cardGap }]}>
            <View style={[styles.mainColumn, { gap: cardGap }]}>
              {displaySection}
              {keypad}
              {themeCard}
            </View>
            {renderHistoryPanel('side')}
          </View>
        ) : (
          <View style={{ flex: 1, gap: cardGap }}>
            {displaySection}
            {keypad}
            {renderHistoryPanel('below')}
            {themeCard}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
    paddingRight: 12,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#374268',
    backgroundColor: '#0b1224',
  },
  headerButtonPressed: {
    opacity: 0.85,
  },
  headerButtonText: {
    color: '#cfd4e6',
    fontSize: 12,
    fontWeight: '700',
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
    fontWeight: '700',
  },
  subtitle: {
    color: '#cfd4e6',
    marginTop: 4,
  },

  calculatorCard: {
    flex: 1,
    backgroundColor: '#0b1022',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#232c4a',
  },
  landscapeLayout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  mainColumn: {
    flex: 1,
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
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    flex: 1,
  },

  historyCardInline: {
    backgroundColor: '#0b1022',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#3b2f1a',
    padding: 12,
    gap: 8,
  },
  themeCardInline: {
    backgroundColor: '#0b1022',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#232c4a',
    padding: 12,
    gap: 8,
  },
  historyPortrait: {
    alignSelf: 'stretch',
  },
  historySide: {
    alignSelf: 'stretch',
  },
  themeHint: {
    color: '#cfd4e6',
    fontSize: 13,
    lineHeight: 18,
  },
  historyList: {
    maxHeight: 140,
  },
  historyListContent: {
    paddingBottom: 6,
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
