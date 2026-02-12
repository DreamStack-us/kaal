# @dreamstack-us/kaal

## 0.1.2

### Patch Changes

- [#24](https://github.com/DreamStack-us/kaal/pull/24) [`5be08c1`](https://github.com/DreamStack-us/kaal/commit/5be08c13a11f78c08d6fc7a3d7460f09bd1c653e) Thanks [@hariDasu](https://github.com/hariDasu)! - Fix hardcoded grey container backgrounds (#2C2C2E, #1E1E1E) in DatePicker and TimePicker — wrappers are now transparent by default so consumer themes show through. Native iOS picker wrappers also respect themeOverrides.backgroundColor. Fix documentation URL pointing to GitHub Pages.

## 0.1.1

### Patch Changes

- [#21](https://github.com/DreamStack-us/kaal/pull/21) [`ded6ff4`](https://github.com/DreamStack-us/kaal/commit/ded6ff4a281f42f4cb5404e5a1e8370f00f6cf7b) Thanks [@hariDasu](https://github.com/hariDasu)! - fix: remove non-functional keyboard icon from MaterialTimePicker

  Removed the keyboard toggle button that appeared at the bottom-left of the Material-style time picker. The button had no functionality and was purely decorative.

## 0.1.0

### Minor Changes

- [#19](https://github.com/DreamStack-us/kaal/pull/19) [`06a4912`](https://github.com/DreamStack-us/kaal/commit/06a4912fd0bcd7b15ffc5b2e18457e7a264d59c9) Thanks [@hariDasu](https://github.com/hariDasu)! - fix: DatePicker onChange now emits local dates instead of UTC

  Previously, DatePicker's onChange callback returned UTC dates (e.g., `2026-02-25T00:00:00Z`). In timezones west of UTC, reading these with standard JavaScript Date methods (`.getDate()`, `.getMonth()`) would return the wrong day. Now onChange returns local dates that can be read with standard methods without timezone conversion.

  BREAKING: If you were using `.getUTCDate()` / `.getUTCMonth()` to read DatePicker values, switch to `.getDate()` / `.getMonth()`.

## 0.0.5

### Patch Changes

- [#17](https://github.com/DreamStack-us/kaal/pull/17) [`fbc284a`](https://github.com/DreamStack-us/kaal/commit/fbc284a91b4af40858666cb1aee18dc8db40945a) Thanks [@hariDasu](https://github.com/hariDasu)! - fix: correct UTC timezone handling in CalendarGrid

  - Fix off-by-one month label in CalendarGrid header (e.g., showing "January" instead of "February")
  - Fix off-by-one day in DayCell accessibility labels
  - Root cause: `Intl.DateTimeFormat` was interpreting UTC dates in local timezone, causing date rollback in western timezones
  - Added `timeZone: 'UTC'` to all DateTimeFormat calls in date utilities and DayCell components

- [#17](https://github.com/DreamStack-us/kaal/pull/17) [`fbc284a`](https://github.com/DreamStack-us/kaal/commit/fbc284a91b4af40858666cb1aee18dc8db40945a) Thanks [@hariDasu](https://github.com/hariDasu)! - fix: apply themeOverrides in MaterialTimePicker web implementation

  - Web TimePicker now respects `themeOverrides` prop for time fields, separator, AM/PM toggle, and action buttons
  - Previously, `MaterialTimePicker.web.tsx` used hardcoded colors (#007AFF blue) and ignored the ThemeOverrideProvider context
  - Ported the override pattern from the native implementation so web and native behave consistently

- [`3b6b28a`](https://github.com/DreamStack-us/kaal/commit/3b6b28a8aa506d02a885de17ec6b2b248dbccb02) Thanks [@hariDasu](https://github.com/hariDasu)! - feat: thermometer-style range picker and dependency cleanup

  - Add thermometer effect to date range selection (narrower band connecting start/end circles)
  - Remove react-native-unistyles from peer dependencies (not used in code)
  - Make react-native-nitro-modules optional

## 0.0.4

### Patch Changes

- [#11](https://github.com/DreamStack-us/kaal/pull/11) [`ce4bda8`](https://github.com/DreamStack-us/kaal/commit/ce4bda877e1ca12b85b84f3499417fe937da5f04) Thanks [@hariDasu](https://github.com/hariDasu)! - Fix CalendarGrid crash when date prop is undefined

  - Add defensive null check in `getFirstDayOfMonth` utility
  - Use `||` fallback operator in CalendarGrid state initialization
  - Fallback to `today()` helper for consistent UTC date handling

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
