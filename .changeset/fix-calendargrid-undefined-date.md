---
"@dreamstack-us/kaal": patch
---

Fix CalendarGrid crash when date prop is undefined

- Add defensive null check in `getFirstDayOfMonth` utility
- Use `||` fallback operator in CalendarGrid state initialization
- Fallback to `today()` helper for consistent UTC date handling
