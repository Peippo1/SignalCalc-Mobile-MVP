import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  variant = 'digit',
  style,
  flex = 1,
}) {
  const colors = variantStyles[variant] ?? variantStyles.digit;

  return (
    <View style={[styles.wrapper, { flex }]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.backgroundColor, borderColor: colors.borderColor }, style]}
        onPress={onPress}
        activeOpacity={0.85}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  button: {
    margin: 6,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    borderWidth: 1,
    shadowColor: '#0b1022',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
  },
});
