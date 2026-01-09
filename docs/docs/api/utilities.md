---
sidebar_position: 6
---

# Utilities

Kaal exports utility functions for working with dates and times.

## Date Utilities

### toISODateString

Converts a Date to ISO date string (YYYY-MM-DD).

```tsx
import { toISODateString } from '@dreamstack-us/kaal';

const date = new Date(2024, 0, 15);
toISODateString(date); // "2024-01-15"
```

### parseISODate

Parses an ISO date string to a Date object.

```tsx
import { parseISODate } from '@dreamstack-us/kaal';

const date = parseISODate('2024-01-15');
// Date object for January 15, 2024 at midnight UTC
```

### addDays

Adds days to a date.

```tsx
import { addDays } from '@dreamstack-us/kaal';

const date = new Date(2024, 0, 15);
const newDate = addDays(date, 5);
// January 20, 2024
```

### addMonths

Adds months to a date, handling overflow correctly.

```tsx
import { addMonths } from '@dreamstack-us/kaal';

const date = new Date(2024, 0, 31); // Jan 31
const newDate = addMonths(date, 1);
// February 29, 2024 (leap year)
```

### compareDates

Compares two dates.

```tsx
import { compareDates } from '@dreamstack-us/kaal';

const a = new Date(2024, 0, 15);
const b = new Date(2024, 0, 20);

compareDates(a, b); // negative (a < b)
compareDates(b, a); // positive (b > a)
compareDates(a, a); // 0 (equal)
```

### isSameDay

Checks if two dates are the same day.

```tsx
import { isSameDay } from '@dreamstack-us/kaal';

const a = new Date(2024, 0, 15, 10, 30);
const b = new Date(2024, 0, 15, 14, 45);

isSameDay(a, b); // true
```

### isSameMonth

Checks if two dates are in the same month.

```tsx
import { isSameMonth } from '@dreamstack-us/kaal';

const a = new Date(2024, 0, 15);
const b = new Date(2024, 0, 28);

isSameMonth(a, b); // true
```

### getMonthDays

Gets all days in a month.

```tsx
import { getMonthDays } from '@dreamstack-us/kaal';

const days = getMonthDays(2024, 1); // February 2024
// Array of 29 Date objects (leap year)
```

### getFirstDayOfMonth

Gets the first day of a month.

```tsx
import { getFirstDayOfMonth } from '@dreamstack-us/kaal';

const date = new Date(2024, 0, 15);
const first = getFirstDayOfMonth(date);
// January 1, 2024
```

### getLastDayOfMonth

Gets the last day of a month.

```tsx
import { getLastDayOfMonth } from '@dreamstack-us/kaal';

const date = new Date(2024, 1, 15); // February
const last = getLastDayOfMonth(date);
// February 29, 2024
```

### getDayOfWeek

Gets the day of week (0 = Sunday).

```tsx
import { getDayOfWeek } from '@dreamstack-us/kaal';

const date = new Date(2024, 0, 15); // Monday
getDayOfWeek(date); // 1
```

### today

Gets today's date at midnight UTC.

```tsx
import { today } from '@dreamstack-us/kaal';

const now = today();
// Today at 00:00:00 UTC
```

---

## Formatting Utilities

### formatMonth

Formats a date's month.

```tsx
import { formatMonth } from '@dreamstack-us/kaal';

const date = new Date(2024, 0, 15);
formatMonth(date, 'en-US', 'long'); // "January"
formatMonth(date, 'de-DE', 'short'); // "Jan"
```

### formatWeekday

Formats a date's weekday.

```tsx
import { formatWeekday } from '@dreamstack-us/kaal';

const date = new Date(2024, 0, 15); // Monday
formatWeekday(date, 'en-US', 'long'); // "Monday"
formatWeekday(date, 'en-US', 'short'); // "Mon"
formatWeekday(date, 'en-US', 'narrow'); // "M"
```

### formatYearMonth

Formats year and month together.

```tsx
import { formatYearMonth } from '@dreamstack-us/kaal';

const date = new Date(2024, 0, 15);
formatYearMonth(date, 'en-US'); // "January 2024"
```

---

## Time Utilities

### to12Hour

Converts 24-hour to 12-hour format.

```tsx
import { to12Hour } from '@dreamstack-us/kaal';

to12Hour(14); // { hours12: 2, period: 'PM' }
to12Hour(0);  // { hours12: 12, period: 'AM' }
```

### to24Hour

Converts 12-hour to 24-hour format.

```tsx
import { to24Hour } from '@dreamstack-us/kaal';

to24Hour(2, 'PM');  // 14
to24Hour(12, 'AM'); // 0
to24Hour(12, 'PM'); // 12
```

### formatTime

Formats a TimeValue for display.

```tsx
import { formatTime, type TimeValue } from '@dreamstack-us/kaal';

const time: TimeValue = { hours: 14, minutes: 30 };

formatTime(time, false); // "2:30 PM"
formatTime(time, true);  // "14:30"
```

### snapToInterval

Snaps minutes to a given interval.

```tsx
import { snapToInterval } from '@dreamstack-us/kaal';

snapToInterval(23, 15); // 30
snapToInterval(7, 15);  // 0
snapToInterval(52, 15); // 0 (wraps to next hour)
```

---

## Validation Schemas

Kaal uses Valibot for validation. These schemas are exported for use in forms:

```tsx
import {
  isoDateSchema,
  isoDateTimeSchema,
  dateRangeSchema,
  datePickerValueSchema,
} from '@dreamstack-us/kaal';

import * as v from 'valibot';

// Validate an ISO date string
const result = v.safeParse(isoDateSchema, '2024-01-15');
if (result.success) {
  console.log('Valid date:', result.output);
}
```
