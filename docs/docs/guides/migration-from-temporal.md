---
sidebar_position: 4
---

# Migration from Temporal

Guide for migrating from Temporal API to native Date API in Kaal v1.0.

## Overview

Kaal v1.0 removes the dependency on `@js-temporal/polyfill` in favor of native JavaScript `Date` and `Intl` APIs. This reduces bundle size by approximately 14-52KB.

## Breaking Changes

### Value Type Change

**Before (v0.x):**
```tsx
import { Temporal } from '@js-temporal/polyfill';
import { DatePicker } from '@dreamstack-us/kaal';

const [date, setDate] = useState(
  Temporal.PlainDate.from('2024-01-15')
);

<DatePicker value={date} onChange={setDate} />
```

**After (v1.x):**
```tsx
import { DatePicker } from '@dreamstack-us/kaal';

const [date, setDate] = useState(new Date('2024-01-15'));

<DatePicker value={date} onChange={setDate} />
```

### Removed Peer Dependency

Remove `@js-temporal/polyfill` from your dependencies:

```bash
npm uninstall @js-temporal/polyfill
```

## Migration Steps

### 1. Update Imports

**Before:**
```tsx
import { Temporal } from '@js-temporal/polyfill';
```

**After:**
```tsx
// Remove the import entirely
// Use native Date instead
```

### 2. Update Date Creation

**Before:**
```tsx
const date = Temporal.PlainDate.from('2024-01-15');
const now = Temporal.Now.plainDateISO();
```

**After:**
```tsx
import { parseISODate, today } from '@dreamstack-us/kaal';

const date = parseISODate('2024-01-15');
const now = today();

// Or use native Date
const date = new Date('2024-01-15');
const now = new Date();
```

### 3. Update Date Arithmetic

**Before:**
```tsx
const nextMonth = date.add({ months: 1 });
const nextWeek = date.add({ days: 7 });
```

**After:**
```tsx
import { addMonths, addDays } from '@dreamstack-us/kaal';

const nextMonth = addMonths(date, 1);
const nextWeek = addDays(date, 7);
```

### 4. Update Comparisons

**Before:**
```tsx
const isEqual = Temporal.PlainDate.compare(a, b) === 0;
const isBefore = Temporal.PlainDate.compare(a, b) < 0;
```

**After:**
```tsx
import { compareDates, isSameDay } from '@dreamstack-us/kaal';

const isEqual = isSameDay(a, b);
const isBefore = compareDates(a, b) < 0;
```

### 5. Update Formatting

**Before:**
```tsx
const formatted = date.toLocaleString('en-US', {
  month: 'long',
  year: 'numeric',
});
```

**After:**
```tsx
import { formatYearMonth } from '@dreamstack-us/kaal';

const formatted = formatYearMonth(date, 'en-US');

// Or use native Intl directly
const formatted = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
}).format(date);
```

### 6. Update ISO String Conversion

**Before:**
```tsx
const isoString = date.toString(); // "2024-01-15"
const fromString = Temporal.PlainDate.from(isoString);
```

**After:**
```tsx
import { toISODateString, parseISODate } from '@dreamstack-us/kaal';

const isoString = toISODateString(date); // "2024-01-15"
const fromString = parseISODate(isoString);
```

## Utility Function Mapping

| Temporal API | Kaal v1.x Equivalent |
|--------------|---------------------|
| `Temporal.PlainDate.from(iso)` | `parseISODate(iso)` |
| `Temporal.Now.plainDateISO()` | `today()` |
| `date.toString()` | `toISODateString(date)` |
| `date.add({ days: n })` | `addDays(date, n)` |
| `date.add({ months: n })` | `addMonths(date, n)` |
| `Temporal.PlainDate.compare(a, b)` | `compareDates(a, b)` |
| `date.equals(other)` | `isSameDay(date, other)` |
| `date.year` | `date.getUTCFullYear()` |
| `date.month` | `date.getUTCMonth() + 1` |
| `date.day` | `date.getUTCDate()` |
| `date.dayOfWeek` | `getDayOfWeek(date)` |

## Timezone Considerations

### Temporal Behavior

Temporal's `PlainDate` was timezone-agnostic, representing a calendar date without time.

### Native Date Behavior

Native `Date` always has a time component. Kaal's utilities work with UTC to avoid timezone issues:

```tsx
// All Kaal date utilities use UTC internally
const date = parseISODate('2024-01-15');
date.getUTCFullYear(); // 2024
date.getUTCMonth();    // 0 (January)
date.getUTCDate();     // 15

// Local time methods may differ based on timezone
date.getFullYear();    // May be 2024 or different depending on timezone
```

### Best Practices

1. **Use UTC methods** when working with dates:
   ```tsx
   date.getUTCFullYear() // not date.getFullYear()
   date.getUTCMonth()    // not date.getMonth()
   date.getUTCDate()     // not date.getDate()
   ```

2. **Use Kaal utilities** for date manipulation:
   ```tsx
   import { addDays, addMonths, parseISODate, toISODateString } from '@dreamstack-us/kaal';
   ```

3. **Store dates as ISO strings** when persisting:
   ```tsx
   const isoString = toISODateString(date);
   // Store "2024-01-15" in database/storage
   ```

## Validation Migration

**Before (with Zod):**
```tsx
import { z } from 'zod';
const schema = z.string().date();
```

**After (with Valibot):**
```tsx
import { isoDateSchema } from '@dreamstack-us/kaal';
import * as v from 'valibot';

const result = v.safeParse(isoDateSchema, '2024-01-15');
```

## Bundle Size Impact

| Package | Size |
|---------|------|
| `@js-temporal/polyfill` | ~14-52KB |
| Kaal date utilities | ~2KB |
| **Savings** | **~12-50KB** |

## Need Help?

If you encounter issues during migration:

1. Check the [API Reference](/docs/api/utilities) for utility function details
2. Open an issue on [GitHub](https://github.com/DreamStack-us/kaal/issues)
