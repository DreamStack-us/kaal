---
"@dreamstack-us/kaal": patch
---

fix: apply themeOverrides in MaterialTimePicker web implementation

- Web TimePicker now respects `themeOverrides` prop for time fields, separator, AM/PM toggle, and action buttons
- Previously, `MaterialTimePicker.web.tsx` used hardcoded colors (#007AFF blue) and ignored the ThemeOverrideProvider context
- Ported the override pattern from the native implementation so web and native behave consistently
