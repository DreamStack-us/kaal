# @dreamstack-us/kaal

[![npm version](https://img.shields.io/npm/v/@dreamstack-us/kaal.svg)](https://www.npmjs.com/package/@dreamstack-us/kaal)
[![npm downloads](https://img.shields.io/npm/dm/@dreamstack-us/kaal.svg)](https://www.npmjs.com/package/@dreamstack-us/kaal)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@dreamstack-us/kaal)](https://bundlephobia.com/package/@dreamstack-us/kaal)
[![license](https://img.shields.io/npm/l/@dreamstack-us/kaal.svg)](https://github.com/DreamStack-us/kaal/blob/main/LICENSE)

High-performance React Native DatePicker & TimePicker for the New Architecture. Features native iOS/Android pickers via Expo, cross-platform calendar grid, Material Design 3 clock face, and full web support.

## Features

- **Sub-8KB Bundle** - Lightweight and optimized, no bloated dependencies
- **Native Date API** - Uses JavaScript Date and Intl APIs, no Temporal polyfill required
- **M3 Clock Face** - Material Design 3 clock for intuitive time selection
- **Cross-Platform** - Works on iOS, Android, and Web with consistent APIs
- **Design System Ready** - Full theming via `themeOverrides` prop
- **TypeScript First** - Complete type definitions for props and theme overrides
- **Range Selection** - Select date ranges with visual highlighting

## Requirements

- React Native 0.78+ (New Architecture only)
- Expo SDK 53+ (for native pickers)

## Installation

```bash
npm install @dreamstack-us/kaal
# or
yarn add @dreamstack-us/kaal
# or
bun add @dreamstack-us/kaal
```

## Quick Start

### DatePicker

```tsx
import { useState } from 'react';
import { DatePicker } from '@dreamstack-us/kaal';

export default function App() {
  const [date, setDate] = useState(new Date());

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      variant="calendar"
      themeOverrides={{
        primaryColor: '#3b82f6',
        backgroundColor: '#ffffff',
      }}
    />
  );
}
```

### Date Range Selection

```tsx
import { useState } from 'react';
import { DatePicker } from '@dreamstack-us/kaal';

export default function App() {
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: null,
  });

  return (
    <DatePicker
      selectionMode="range"
      startDate={range.startDate}
      endDate={range.endDate}
      onRangeChange={setRange}
      themeOverrides={{
        primaryColor: '#3b82f6',
        cellInRangeColor: 'rgba(59, 130, 246, 0.15)',
      }}
    />
  );
}
```

### TimePicker

```tsx
import { useState } from 'react';
import { TimePicker } from '@dreamstack-us/kaal';

export default function App() {
  const [time, setTime] = useState({ hours: 9, minutes: 30 });

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      theme="android" // Material clock face
      is24Hour={false}
    />
  );
}
```

## Props

### DatePicker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date` | required | Selected date (single mode) |
| `onChange` | `(date: Date) => void` | required | Callback when date changes (single mode) |
| `selectionMode` | `'single' \| 'range'` | `'single'` | Selection mode |
| `startDate` | `Date \| null` | - | Range start date (range mode) |
| `endDate` | `Date \| null` | - | Range end date (range mode) |
| `onRangeChange` | `(range: DateRange) => void` | - | Callback when range changes (range mode) |
| `variant` | `'calendar' \| 'wheel' \| 'compact'` | `'calendar'` | Picker variant |
| `theme` | `'native' \| 'ios' \| 'android' \| 'custom'` | `'native'` | Visual theme |
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `disabledDates` | `Date[]` | `[]` | Array of disabled dates |
| `weekStartsOn` | `0 \| 1` | `0` | First day of week (0=Sun, 1=Mon) |
| `themeOverrides` | `DatePickerThemeOverrides` | - | Custom theme overrides |

### TimePicker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `{ hours: number; minutes: number }` | required | Selected time |
| `onChange` | `(time: TimeValue) => void` | required | Callback when time changes |
| `theme` | `'native' \| 'ios' \| 'android'` | `'native'` | Visual theme |
| `is24Hour` | `boolean` | `false` | Use 24-hour format |
| `minuteInterval` | `1 \| 5 \| 10 \| 15 \| 30` | `1` | Minute step interval |
| `minTime` | `TimeValue` | - | Minimum selectable time |
| `maxTime` | `TimeValue` | - | Maximum selectable time |
| `themeOverrides` | `TimePickerThemeOverrides` | - | Custom theme overrides |

## Theme Overrides

Style components without a theme provider:

```tsx
<DatePicker
  themeOverrides={{
    primaryColor: '#3b82f6',
    cellSelectedColor: '#3b82f6',
    cellTodayColor: 'rgba(59, 130, 246, 0.1)',
    cellInRangeColor: 'rgba(59, 130, 246, 0.15)',
    textColor: '#1e293b',
    textSelectedColor: '#ffffff',
    backgroundColor: '#ffffff',
    borderRadius: 16,
  }}
/>
```

## Documentation

Full documentation with live examples: [kaal.dreamstack.us](https://kaal.dreamstack.us)

## License

MIT
