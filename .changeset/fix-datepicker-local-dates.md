---
"@dreamstack-us/kaal": minor
---

fix: DatePicker onChange now emits local dates instead of UTC

Previously, DatePicker's onChange callback returned UTC dates (e.g., `2026-02-25T00:00:00Z`). In timezones west of UTC, reading these with standard JavaScript Date methods (`.getDate()`, `.getMonth()`) would return the wrong day. Now onChange returns local dates that can be read with standard methods without timezone conversion.

BREAKING: If you were using `.getUTCDate()` / `.getUTCMonth()` to read DatePicker values, switch to `.getDate()` / `.getMonth()`.
