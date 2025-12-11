import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import CalculatorScreen from './src/screens/CalculatorScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <CalculatorScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },
});
