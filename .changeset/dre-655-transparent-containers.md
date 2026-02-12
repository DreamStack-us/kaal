---
"@dreamstack-us/kaal": patch
---

Fix hardcoded grey container backgrounds (#2C2C2E, #1E1E1E) in DatePicker and TimePicker. Wrapper containers are now transparent by default, allowing consumer themes to show through. Native iOS picker wrappers also respect themeOverrides.backgroundColor.
