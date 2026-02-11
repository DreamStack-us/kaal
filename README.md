# @dreamstack-us/kaal

[![npm version](https://img.shields.io/npm/v/@dreamstack-us/kaal.svg)](https://www.npmjs.com/package/@dreamstack-us/kaal)
[![npm downloads](https://img.shields.io/npm/dm/@dreamstack-us/kaal.svg)](https://www.npmjs.com/package/@dreamstack-us/kaal)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@dreamstack-us/kaal)](https://bundlephobia.com/package/@dreamstack-us/kaal)
[![CI](https://github.com/DreamStack-us/kaal/actions/workflows/ci.yml/badge.svg)](https://github.com/DreamStack-us/kaal/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/@dreamstack-us/kaal.svg)](https://github.com/DreamStack-us/kaal/blob/main/LICENSE)

High-performance React Native DatePicker & TimePicker for the New Architecture. Zero styling dependencies - just pass `themeOverrides` to match your design system.

## Features

- **Sub-8KB Bundle** - No bloated dependencies, just the essentials
- **Zero Config Theming** - Style via `themeOverrides` prop, no theme providers needed
- **Native Date API** - Uses JavaScript Date and Intl APIs, no polyfills required
- **Cross-Platform** - iOS, Android, and Web with consistent APIs
- **Range Selection** - Select date ranges with visual highlighting
- **M3 Clock Face** - Material Design 3 clock for time selection
- **TypeScript First** - Full type safety out of the box

## Requirements

- React Native 0.78+ (New Architecture only)
- Expo SDK 53+ (optional, for native pickers)

## Installation

```bash
npm install @dreamstack-us/kaal
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
        cellSelectedColor: '#3b82f6',
        textColor: '#1e293b',
        backgroundColor: '#ffffff',
        borderRadius: 16,
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
        textInRangeColor: '#3b82f6',
      }}
    />
  );
}
```

### TimePicker (iOS Style)

```tsx
import { useState } from 'react';
import { TimePicker } from '@dreamstack-us/kaal';

export default function App() {
  const [time, setTime] = useState({ hours: 9, minutes: 30 });

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      is24Hour={false}
      themeOverrides={{
        primaryColor: '#3b82f6',
        wheelTextColor: '#1e293b',
        backgroundColor: '#ffffff',
      }}
    />
  );
}
```

### TimePicker (Material Clock)

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  theme="android"
  themeOverrides={{
    primaryColor: '#6366f1',
    clockBackground: '#f1f5f9',
    clockHandColor: '#6366f1',
  }}
/>
```

## API Reference

### DatePicker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date` | required | Selected date (single mode) |
| `onChange` | `(date: Date) => void` | required | Date change callback (single mode) |
| `selectionMode` | `'single' \| 'range'` | `'single'` | Selection mode |
| `startDate` | `Date \| null` | - | Range start (range mode) |
| `endDate` | `Date \| null` | - | Range end (range mode) |
| `onRangeChange` | `(range) => void` | - | Range change callback |
| `variant` | `'calendar' \| 'wheel' \| 'compact'` | `'calendar'` | Picker variant |
| `theme` | `'native' \| 'ios' \| 'android'` | `'native'` | Visual theme |
| `minDate` | `Date` | - | Minimum date |
| `maxDate` | `Date` | - | Maximum date |
| `disabledDates` | `Date[]` | `[]` | Disabled dates |
| `weekStartsOn` | `0 \| 1` | `0` | Week start (0=Sun) |
| `themeOverrides` | `object` | - | Theme customization |

### TimePicker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `{ hours, minutes }` | required | Selected time |
| `onChange` | `(time) => void` | required | Time change callback |
| `theme` | `'native' \| 'ios' \| 'android'` | `'native'` | Visual theme |
| `is24Hour` | `boolean` | `false` | 24-hour format |
| `minuteInterval` | `1\|5\|10\|15\|30` | `1` | Minute steps |
| `themeOverrides` | `object` | - | Theme customization |

### Theme Overrides

```tsx
// DatePicker
themeOverrides={{
  primaryColor: string,
  cellSelectedColor: string,
  cellTodayColor: string,
  cellInRangeColor: string,    // Range selection highlight
  textColor: string,
  textSelectedColor: string,
  textDisabledColor: string,
  textInRangeColor: string,    // Range text color
  backgroundColor: string,
  borderRadius: number,
}}

// TimePicker (iOS wheel)
themeOverrides={{
  primaryColor: string,
  wheelTextColor: string,
  wheelSeparatorColor: string,
  wheelSelectionHighlight: string,
  backgroundColor: string,
}}

// TimePicker (Material clock)
themeOverrides={{
  primaryColor: string,
  clockBackground: string,
  clockHandColor: string,
  clockTextColor: string,
  clockTextSelectedColor: string,
}}
```

## Documentation

Full docs with live examples: **[dreamstack-us.github.io/kaal](https://dreamstack-us.github.io/kaal/)**

## Development

```bash
# Clone and install
git clone https://github.com/DreamStack-us/kaal.git
cd kaal
bun install

# Development
bun run dev          # Watch mode build
bun run typecheck    # Type check
bun run lint         # Lint
bun run test         # Run tests

# Release
bun run changeset    # Create changeset
bun run release      # Build and publish
```

## License

MIT
