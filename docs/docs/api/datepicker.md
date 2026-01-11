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

### `weekStartsOn`

**Type:** `0 | 1`
**Default:** `0`

The first day of the week. `0` = Sunday, `1` = Monday.

```tsx
// Calendar starts on Monday
<DatePicker
  value={date}
  onChange={setDate}
  weekStartsOn={1}
/>
```

:::note
This is a temporary solution for week start configuration. Full locale support with automatic detection of week start day, localized day/month names, and RTL support is planned for a future release.
:::

### `themeOverrides`

**Type:** `DatePickerThemeOverrides`
**Default:** `undefined`

Custom theme overrides for styling the DatePicker without using a theme provider. This is the recommended approach for web apps and when you want to integrate with your existing design system.

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  themeOverrides={{
    primaryColor: '#22d3ee',
    cellSelectedColor: '#22d3ee',
    cellTodayColor: 'rgba(34, 211, 238, 0.2)',
    textColor: '#FFFFFF',
    textSelectedColor: '#FFFFFF',
    textDisabledColor: '#6b7280',
    textWeekendColor: '#9ca3af',
    backgroundColor: '#1f2937',
    borderRadius: 16,
  }}
/>
```

#### DatePickerThemeOverrides Properties

| Property | Type | Description |
|----------|------|-------------|
| `primaryColor` | `string` | Primary accent color for navigation and highlights |
| `cellSelectedColor` | `string` | Background color of the selected date cell |
| `cellTodayColor` | `string` | Background color of today's date cell |
| `cellBorderRadius` | `number` | Border radius for date cells |
| `textColor` | `string` | Default text color for dates |
| `textSelectedColor` | `string` | Text color for the selected date |
| `textDisabledColor` | `string` | Text color for disabled dates |
| `textWeekendColor` | `string` | Text color for weekend dates |
| `backgroundColor` | `string` | Container background color |
| `headerBackground` | `string` | Header/navigation background color |
| `borderRadius` | `number` | Border radius for the calendar container |
| `padding` | `number` | Padding for the calendar container |

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
import type { DatePickerProps, DatePickerThemeOverrides } from '@dreamstack-us/kaal';

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
  weekStartsOn?: 0 | 1;
  themeOverrides?: DatePickerThemeOverrides;
}

// DatePickerThemeOverrides interface
interface DatePickerThemeOverrides {
  primaryColor?: string;
  cellSelectedColor?: string;
  cellTodayColor?: string;
  cellBorderRadius?: number;
  textColor?: string;
  textSelectedColor?: string;
  textDisabledColor?: string;
  textWeekendColor?: string;
  backgroundColor?: string;
  headerBackground?: string;
  borderRadius?: number;
  padding?: number;
}
```
