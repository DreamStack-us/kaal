---
"@dreamstack-us/kaal": minor
"@dreamstack-us/kaal-themes": patch
---

Remove unistyles dependency for web compatibility (DRE-446)

- Removed react-native-unistyles from internal components
- Added themeOverrides prop to DatePicker and TimePicker
- Added weekStartsOn prop for locale-aware calendar
- Added ThemeOverrideContext for provider-based theming
- Improved accessibility with spinbutton roles
- Components work standalone without provider

BREAKING: KaalProvider no longer required, initUnistyles() removed
