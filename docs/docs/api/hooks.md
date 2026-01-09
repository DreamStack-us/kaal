---
sidebar_position: 5
---

# Hooks

Kaal provides React hooks for managing date and time picker state.

## useDatePicker

A hook for managing DatePicker state with optional constraints.

### Import

```tsx
import { useDatePicker } from '@dreamstack-us/kaal';
```

### Usage

```tsx
const {
  selectedDate,
  setSelectedDate,
  displayMonth,
  setDisplayMonth,
  goToNextMonth,
  goToPrevMonth,
  goToToday,
  isDateDisabled,
} = useDatePicker({
  initialDate: new Date(),
  minDate: new Date('2024-01-01'),
  maxDate: new Date('2024-12-31'),
  disabledDates: [],
});
```

### Options

| Option | Type | Description |
|--------|------|-------------|
| `initialDate` | `Date` | The initial selected date |
| `minDate` | `Date` | Minimum selectable date |
| `maxDate` | `Date` | Maximum selectable date |
| `disabledDates` | `Date[]` | Array of disabled dates |

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `selectedDate` | `Date` | Current selected date |
| `setSelectedDate` | `(date: Date) => void` | Set the selected date |
| `displayMonth` | `{ year: number; month: number }` | Currently displayed month |
| `setDisplayMonth` | `(year: number, month: number) => void` | Set display month |
| `goToNextMonth` | `() => void` | Navigate to next month |
| `goToPrevMonth` | `() => void` | Navigate to previous month |
| `goToToday` | `() => void` | Navigate to current month |
| `isDateDisabled` | `(date: Date) => boolean` | Check if date is disabled |

---

## useCalendar

A hook for generating calendar data for a given month.

### Import

```tsx
import { useCalendar } from '@dreamstack-us/kaal';
```

### Usage

```tsx
const { days, weekDays, monthName } = useCalendar({
  year: 2024,
  month: 0, // January
  locale: 'en-US',
  firstDayOfWeek: 0, // Sunday
});
```

### Options

| Option | Type | Description |
|--------|------|-------------|
| `year` | `number` | The year |
| `month` | `number` | The month (0-11) |
| `locale` | `string` | Locale for formatting |
| `firstDayOfWeek` | `0-6` | First day of week |

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `days` | `Date[]` | All days in the month |
| `weekDays` | `string[]` | Localized weekday names |
| `monthName` | `string` | Localized month name |
| `weeksInMonth` | `number` | Number of weeks |

---

## useTimePicker

A hook for managing TimePicker state.

### Import

```tsx
import { useTimePicker, type TimeValue } from '@dreamstack-us/kaal';
```

### Usage

```tsx
const {
  time,
  setTime,
  hours,
  minutes,
  period,
  setHours,
  setMinutes,
  setPeriod,
  isTimeDisabled,
} = useTimePicker({
  initialTime: { hours: 9, minutes: 30 },
  is24Hour: false,
  minuteInterval: 15,
  minTime: { hours: 9, minutes: 0 },
  maxTime: { hours: 17, minutes: 0 },
});
```

### Options

| Option | Type | Description |
|--------|------|-------------|
| `initialTime` | `TimeValue` | Initial time value |
| `is24Hour` | `boolean` | Use 24-hour format |
| `minuteInterval` | `number` | Minute selection interval |
| `minTime` | `TimeValue` | Minimum selectable time |
| `maxTime` | `TimeValue` | Maximum selectable time |

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `time` | `TimeValue` | Current time |
| `setTime` | `(time: TimeValue) => void` | Set the time |
| `hours` | `number` | Current hours (in 12h or 24h based on format) |
| `minutes` | `number` | Current minutes |
| `period` | `'AM' \| 'PM'` | AM/PM (only in 12h mode) |
| `setHours` | `(hours: number) => void` | Set hours |
| `setMinutes` | `(minutes: number) => void` | Set minutes |
| `setPeriod` | `(period: 'AM' \| 'PM') => void` | Set period |
| `isTimeDisabled` | `(time: TimeValue) => boolean` | Check if time is disabled |
