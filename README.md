# SignalCalc Mobile

![FinchWorks Studio banner](docs/finchworks-banner.png)

[![Expo](https://img.shields.io/badge/Expo-54.0-1B1F36?logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Platforms](https://img.shields.io/badge/iOS%20%7C%20Android%20%7C%20Web-universal-0b7)](#running)
[![License](https://img.shields.io/badge/License-MIT-0b7)](#license)

SignalCalc is a modern, keyboard-friendly calculator with memory keys, history, and accessible UI inspired by the FinchWorks Studio design system.

## Features
- Memory keys: `MC`, `MR`, `M+`, `M-`, with live memory indicator
- History of last 5 calculations with expression + result
- Answer recall (`Ans`), percent, parentheses, sign toggle, and backspace support
- Dark, card-based layout with accent buttons and status pill
- Built on Expo Router / React Native with TypeScript-ready setup

## Project structure
```
App.js                # Entry mounts CalculatorScreen
src/
  components/        # CalculatorButton and related UI pieces
  logic/             # useCalculator hook (state, memory, history)
  screens/           # CalculatorScreen layout
  theme/             # Theme primitives (expandable)
docs/
  finchworks-banner.png
app/                 # Expo Router starter (unused for MVP)
components/, hooks/  # Expo template helpers (icons, themed views)
```

## Prerequisites
- Node 18+ recommended
- Expo CLI: `npm i -g expo-cli` (optional, `npx expo` works too)

## Running
```bash
npm install
npx expo start
```
Then open the QR code (Expo Go), press `i` for iOS simulator, `a` for Android, or `w` for web.

## Key scripts
- `npm start` / `npx expo start` – launch Metro bundler
- `npm run android` / `npm run ios` / `npm run web` – run on a specific platform
- `npm run lint` – lint with Expo config

## Notes
- Entry point is `App.js`, which mounts `src/screens/CalculatorScreen`. The Expo Router starter in `app/` can be removed if unused.
- History and memory are kept in-memory; persistence can be added via async storage if needed.

## License
MIT
