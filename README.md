# SignalCalc Mobile

![FinchWorks Studio banner](docs/finchworks-banner.png)

[![Expo](https://img.shields.io/badge/Expo-54.0-1B1F36?logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Platforms](https://img.shields.io/badge/iOS%20%7C%20Android%20%7C%20Web-universal-0b7)](#running)
[![License](https://img.shields.io/badge/License-MIT-0b7)](#license)
[![FinchWorks Studio](https://img.shields.io/badge/FinchWorks-Studio-blueviolet?logo=sparkles)](https://github.com/Peippo1)

SignalCalc is a modern, keyboard-friendly calculator with memory keys, history, and accessible UI inspired by the FinchWorks Studio design system.

## Features
- Memory keys: `MC`, `MR`, `M+`, `M-`, with live memory indicator
- History of last 5 calculations with expression + result
- Answer recall (`Ans`), percent, parentheses, sign toggle, and backspace support
- Long-press backspace to clear entry, haptics on press, copy result to clipboard
- Persists history/memory/ANS across sessions
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

## Architecture

```mermaid
flowchart TD
  App[App.js\nEntry point] --> Screen[CalculatorScreen\nUI Layout]
  Screen --> Button[CalculatorButton\nReusable UI Button]
  Screen --> Logic[useCalculator Hook\nState + Logic]
  Logic --> Mem[Memory System\nMC/MR/M+/M-]
  Logic --> Hist[History System\nLast 5 Calculations]
  Logic --> Eval[Expression Evaluator\n(numbers, ops, %, sign)]
  Eval --> State[(React State)]
  State --> Screen
  App --> Assets[[Assets\nicons, banner]]
  App --> Expo[Expo Runtime\niOS • Android • Web]
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


## Roadmap

### v1.0 – MVP
- Core calculator logic
- Memory keys (MC, MR, M+, M-)
- History of last 5 calculations
- Ans, %, sign toggle, parentheses
- Dark theme

### v1.1 – UI & UX polish
- Haptic feedback
- Improved animations
- Theme expansion (light/dark auto mode)

### v1.5 – Feature expansion
- Full history view
- Export tape (text / JSON)
- Custom accent colours
- Persistence via AsyncStorage

### v2.0 – Pro Tier
- Unlimited history
- Scientific mode (sin, cos, tan, log)
- Advanced operations (√, x², x³, n!)
- Macro buttons (programmable sequences)
- Custom themes & premium layouts

See the full [CHANGELOG](CHANGELOG.md) for version tracking.

## Pro Tier (Planned)

SignalCalc Mobile Pro will introduce advanced tooling for power‑users:

- Unlimited memory & history
- Export and share calculation tape
- Advanced scientific operations
- Macro system for quick programmable sequences
- FinchWorks premium themes
- Early access to feature updates

## Notes
- Entry point is `App.js`, which mounts `src/screens/CalculatorScreen`. The Expo Router starter in `app/` can be removed if unused.
- History and memory are kept in-memory; persistence can be added via async storage if needed.

A full documentation site will be available soon via GitHub Pages or Docusaurus, including API details, design system specs, and Pro tier feature docs.

## How calculations work

The calculator uses a custom `useCalculator` hook which manages:

### Parsing & expression state
- Button presses append characters to an expression string
- Sanitisation prevents invalid sequences (e.g., `*/`, `..`, unmatched parentheses)

### Evaluation pipeline
1. Expression string prepared for JS `eval()`-safe processing  
2. Percent operations converted to fractional multipliers  
3. Memory and Ans tokens resolved  
4. Safe evaluation returns a numeric result or an error flag

### History & memory
- History stores the last 5 successful calculations  
- Memory stores a single running number, updated via MC/MR/M+/M-  
- Both are kept in React state (future versions may persist them)

## License
MIT — see the full [LICENSE](LICENSE) file for details.
