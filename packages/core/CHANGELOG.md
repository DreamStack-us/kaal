# @dreamstack-us/kaal

## 1.0.0

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
  - @dreamstack-us/kaal-themes@1.0.0
