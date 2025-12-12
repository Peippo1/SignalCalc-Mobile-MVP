import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const variantStyles = {
  digit: {
    backgroundColor: '#0f162b',
    borderColor: '#1f2a48',
    text: '#f5f7fb',
  },
  operator: {
    backgroundColor: '#6d5dfc',
    borderColor: '#8879ff',
    text: '#ffffff',
  },
  action: {
    backgroundColor: '#f39c12',
    borderColor: '#f5b041',
    text: '#0b1022',
  },
  accent: {
    backgroundColor: '#22c55e',
    borderColor: '#3ad072',
    text: '#04210d',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: '#1f2a48',
    text: '#cfd4e6',
  },
};

export default function CalculatorButton({
  label,
  onPress,
  onLongPress,
  variant = 'digit',
  style,
  flex = 1,
  disabled = false,
  accessibilityLabel,
}) {
  const colors = variantStyles[variant] ?? variantStyles.digit;

  const handlePress = () => {
    if (disabled) return;
    Haptics.selectionAsync().catch(() => undefined);
    onPress?.();
  };

  const handleLongPress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
    onLongPress?.();
  };

  return (
    <View style={[styles.wrapper, { flex }]}>
      <Pressable
        accessibilityLabel={accessibilityLabel || `Calculator button ${label}`}
        accessibilityRole="button"
        disabled={disabled}
        onPress={handlePress}
        onLongPress={handleLongPress}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
            opacity: disabled ? 0.55 : pressed ? 0.85 : 1,
          },
          style,
        ]}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minWidth: 0,
  },
  button: {
    margin: 6,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,           // keeps square buttons that scale
    width: '100%',            // fill available column width
    borderWidth: 1,
    shadowColor: '#0b1022',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
});
