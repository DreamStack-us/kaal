---
"@dreamstack-us/kaal": patch
---

fix: correct UTC timezone handling in CalendarGrid

- Fix off-by-one month label in CalendarGrid header (e.g., showing "January" instead of "February")
- Fix off-by-one day in DayCell accessibility labels
- Root cause: `Intl.DateTimeFormat` was interpreting UTC dates in local timezone, causing date rollback in western timezones
- Added `timeZone: 'UTC'` to all DateTimeFormat calls in date utilities and DayCell components
