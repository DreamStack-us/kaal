---
sidebar_position: 1
---

# DatePicker

The `DatePicker` component provides a flexible date selection interface with multiple variants and themes.

## Import

```tsx
import { DatePicker } from '@dreamstack-us/kaal';
```

## Props

### `value`

**Type:** `Date`
**Required:** Yes

The currently selected date.

```tsx
const [date, setDate] = useState(new Date());
<DatePicker value={date} onChange={setDate} />
```

### `onChange`

**Type:** `(date: Date) => void`
**Required:** Yes

Callback fired when the selected date changes.

### `theme`

**Type:** `'native' | 'ios' | 'android' | 'custom'`
**Default:** `'native'`

The visual theme for the picker.

- `native` - Uses platform-specific native picker (UIDatePicker on iOS, MaterialDatePicker on Android)
- `ios` - iOS-style wheel picker on all platforms
- `android` - Android-style picker on all platforms
- `custom` - Custom styling (requires Unistyles theme)

### `variant`

**Type:** `'wheel' | 'calendar' | 'compact'`
**Default:** `'calendar'`

The picker variant to display.

- `wheel` - Spinning wheel picker (iOS style)
- `calendar` - Full month calendar grid
- `compact` - Minimal date input

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  variant="wheel"
/>
```

### `minDate`

**Type:** `Date`
**Default:** `undefined`

The minimum selectable date.

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date('2024-01-01')}
/>
```

### `maxDate`

**Type:** `Date`
**Default:** `undefined`

The maximum selectable date.

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  maxDate={new Date('2025-12-31')}
/>
```

### `disabledDates`

**Type:** `Date[]`
**Default:** `[]`

An array of dates that cannot be selected.

```tsx
const holidays = [
  new Date('2024-12-25'),
  new Date('2024-12-26'),
];

<DatePicker
  value={date}
  onChange={setDate}
  disabledDates={holidays}
/>
```

### `locale`

**Type:** `string`
**Default:** `'en-US'`

The locale to use for formatting. Accepts any valid Unicode locale identifier.

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  locale="de-DE"
/>
```

## Examples

### Basic Calendar

```tsx
import { DatePicker } from '@dreamstack-us/kaal';
import { useState } from 'react';

function BasicCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      theme="native"
      variant="calendar"
    />
  );
}
```

### Wheel Picker with Date Range

```tsx
import { DatePicker } from '@dreamstack-us/kaal';
import { useState } from 'react';

function WheelPickerWithRange() {
  const [date, setDate] = useState(new Date());

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      theme="ios"
      variant="wheel"
      minDate={new Date('2024-01-01')}
      maxDate={new Date('2024-12-31')}
    />
  );
}
```

## TypeScript

```tsx
import type { DatePickerProps } from '@dreamstack-us/kaal';

// DatePickerProps interface
interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  theme?: 'native' | 'ios' | 'android' | 'custom';
  variant?: 'wheel' | 'calendar' | 'compact';
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale?: string;
}
```
