# Changelog

All notable changes to SignalCalc Mobile are documented here.

## [1.0.0] – 2026-08-11

### Added

- Safe local expression parser with precedence, parentheses, unary negatives, and division-by-zero handling.
- Memory keys, answer recall, five-item history, persistence, clipboard copy, and haptics.
- Responsive React Native UI with accessibility labels and 44pt touch targets.
- Unit coverage for evaluator edge cases and calculator behavior.

### Changed

- Removed unused Expo Router routes, template components, and unnecessary direct dependencies.
- Configured the app as a single Expo entrypoint with a single web export.
- Limited Dependabot to monthly checks with no routine pull requests.

### Fixed

- Replaced dynamic code execution with a safe parser.
- Fixed stale Expo Router/static route wiring.
- Removed placeholder copy and theme behavior.
