---
sidebar_position: 2
---

# TimePicker

The `TimePicker` component provides time selection with iOS wheel style or Material Design 3 clock face.

## Import

```tsx
import { TimePicker, type TimeValue } from '@dreamstack-us/kaal';
```

## Props

### `value`

**Type:** `TimeValue` (`{ hours: number; minutes: number }`)
**Required:** Yes

The currently selected time.

```tsx
const [time, setTime] = useState<TimeValue>({ hours: 9, minutes: 30 });
<TimePicker value={time} onChange={setTime} />
```

### `onChange`

**Type:** `(time: TimeValue) => void`
**Required:** Yes

Callback fired when the selected time changes.

### `theme`

**Type:** `'native' | 'ios' | 'android'`
**Default:** `'native'`

The visual theme for the picker.

- `native` - Uses platform-specific native picker
- `ios` - Wheel-based picker (iOS style)
- `android` - Clock face picker (Material Design 3)

```tsx
// iOS wheel style
<TimePicker value={time} onChange={setTime} theme="ios" />

// Material clock face
<TimePicker value={time} onChange={setTime} theme="android" />
```

### `is24Hour`

**Type:** `boolean`
**Default:** `false`

Whether to use 24-hour format.

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  is24Hour={true}
/>
```

### `minuteInterval`

**Type:** `1 | 5 | 10 | 15 | 30`
**Default:** `1`

The interval for minute selection.

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  minuteInterval={15}
/>
```

### `minTime`

**Type:** `TimeValue`
**Default:** `undefined`

The minimum selectable time.

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  minTime={{ hours: 9, minutes: 0 }}
/>
```

### `maxTime`

**Type:** `TimeValue`
**Default:** `undefined`

The maximum selectable time.

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  maxTime={{ hours: 17, minutes: 0 }}
/>
```

## Examples

### iOS Wheel Picker

```tsx
import { TimePicker, type TimeValue } from '@dreamstack-us/kaal';
import { useState } from 'react';

function IOSTimePicker() {
  const [time, setTime] = useState<TimeValue>({ hours: 9, minutes: 30 });

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      theme="ios"
      is24Hour={false}
    />
  );
}
```

### Material Clock Face

```tsx
import { TimePicker, type TimeValue } from '@dreamstack-us/kaal';
import { useState } from 'react';

function MaterialTimePicker() {
  const [time, setTime] = useState<TimeValue>({ hours: 14, minutes: 30 });

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      theme="android"
      is24Hour={true}
    />
  );
}
```

### Business Hours Only

```tsx
import { TimePicker, type TimeValue } from '@dreamstack-us/kaal';
import { useState } from 'react';

function BusinessHoursPicker() {
  const [time, setTime] = useState<TimeValue>({ hours: 9, minutes: 0 });

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      theme="native"
      minTime={{ hours: 9, minutes: 0 }}
      maxTime={{ hours: 17, minutes: 0 }}
      minuteInterval={30}
    />
  );
}
```

## TypeScript

```tsx
import type { TimePickerProps, TimeValue } from '@dreamstack-us/kaal';

// TimeValue type
type TimeValue = {
  hours: number;   // 0-23
  minutes: number; // 0-59
};

// TimePickerProps interface
interface TimePickerProps {
  value: TimeValue;
  onChange: (time: TimeValue) => void;
  theme?: 'native' | 'ios' | 'android';
  is24Hour?: boolean;
  minuteInterval?: 1 | 5 | 10 | 15 | 30;
  minTime?: TimeValue;
  maxTime?: TimeValue;
}
```

## Utility Functions

Kaal provides utility functions for working with time values:

```tsx
import { to12Hour, to24Hour, formatTime } from '@dreamstack-us/kaal';

// Convert 24h to 12h format
const { hours12, period } = to12Hour(14); // { hours12: 2, period: 'PM' }

// Convert 12h to 24h format
const hours24 = to24Hour(2, 'PM'); // 14

// Format time for display
const display = formatTime({ hours: 14, minutes: 30 }, false); // "2:30 PM"
```
