---
sidebar_position: 3
---

# CalendarGrid

The `CalendarGrid` component displays a month calendar with selectable days. It's the building block for the DatePicker calendar variant.

## Import

```tsx
import { CalendarGrid } from '@dreamstack-us/kaal';
```

## Props

### `year`

**Type:** `number`
**Required:** Yes

The year to display (e.g., `2024`).

### `month`

**Type:** `number`
**Required:** Yes

The month to display (0-11, where 0 = January).

### `selectedDate`

**Type:** `Date | null`
**Default:** `null`

The currently selected date.

### `onDateSelect`

**Type:** `(date: Date) => void`
**Required:** Yes

Callback fired when a date is selected.

### `minDate`

**Type:** `Date`
**Default:** `undefined`

The minimum selectable date.

### `maxDate`

**Type:** `Date`
**Default:** `undefined`

The maximum selectable date.

### `disabledDates`

**Type:** `Date[]`
**Default:** `[]`

An array of dates that cannot be selected.

### `locale`

**Type:** `string`
**Default:** `'en-US'`

The locale to use for day name formatting.

### `firstDayOfWeek`

**Type:** `0 | 1 | 2 | 3 | 4 | 5 | 6`
**Default:** `0` (Sunday)

The first day of the week (0 = Sunday, 1 = Monday, etc.).

## Example

```tsx
import { CalendarGrid } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text } from 'react-native';

function CalendarExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const today = new Date();

  return (
    <View>
      <Text>
        {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </Text>
      <CalendarGrid
        year={today.getFullYear()}
        month={today.getMonth()}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        minDate={today}
      />
    </View>
  );
}
```

## Styling

CalendarGrid uses the Kaal theme system. Customize appearance through your Unistyles theme:

```tsx
// In your theme configuration
datepicker: {
  cellBackground: '#ffffff',
  cellSelected: '#c41e3a',
  cellToday: '#d4af37',
  textDefault: '#2d1810',
  textSelected: '#ffffff',
  textDisabled: '#9ca3af',
  textWeekend: '#dc2626',
}
```
