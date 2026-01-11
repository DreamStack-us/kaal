# @dreamstack-us/kaal

## 0.0.3

### Patch Changes

- [#9](https://github.com/DreamStack-us/kaal/pull/9) [`1268843`](https://github.com/DreamStack-us/kaal/commit/1268843abcc51cf29e03eb0985af8275a61d1e1e) Thanks [@hariDasu](https://github.com/hariDasu)! - Add date range selection mode to DatePicker

  - New `selectionMode="range"` prop for date range selection
  - New props: `startDate`, `endDate`, `onRangeChange`
  - New theme overrides: `cellInRangeColor`, `textInRangeColor`
  - Visual highlighting for dates between start and end
  - Fix Expo Snack embeds (URL encoding)
  - Add README for npm package display
  - Update root README with current architecture

## 0.0.2

### Minor Changes

- [#6](https://github.com/DreamStack-us/kaal/pull/6) [`4273b58`](https://github.com/DreamStack-us/kaal/commit/4273b58daee1f7c772607762c33be712009552df) Thanks [@hariDasu](https://github.com/hariDasu)! - Remove unistyles dependency for web compatibility (DRE-446)

  - Removed react-native-unistyles from internal components
  - Added themeOverrides prop to DatePicker and TimePicker
  - Added weekStartsOn prop for locale-aware calendar
  - Added ThemeOverrideContext for provider-based theming
  - Improved accessibility with spinbutton roles
  - Components work standalone without provider

  BREAKING: KaalProvider no longer required, initUnistyles() removed

### Patch Changes

- Updated dependencies [[`4273b58`](https://github.com/DreamStack-us/kaal/commit/4273b58daee1f7c772607762c33be712009552df)]:
  - @dreamstack-us/kaal-themes@0.0.2
