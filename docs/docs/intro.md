---
sidebar_position: 1
---

# Introduction

**Kaal** is a high-performance DatePicker and TimePicker library for React Native, built with modern architecture and minimal footprint.

## Why Kaal?

- **Sub-8KB Bundle** - Optimized for production with no unnecessary dependencies
- **Native Date API** - Uses JavaScript's native `Date` and `Intl` APIs, no Temporal polyfill needed
- **Material Design 3** - Beautiful clock face for time selection following M3 guidelines
- **Cross-Platform** - Consistent experience across iOS, Android, and Web
- **Unistyles v3** - Advanced theming with react-native-unistyles
- **New Architecture** - Built for React Native 0.78+ with TurboModules and Fabric support

## Components

### DatePicker

A flexible date picker with multiple variants:
- **Calendar** - Full month calendar view
- **Wheel** - iOS-style spinning wheel picker
- **Compact** - Minimal date input

### TimePicker

A time picker with platform-appropriate styles:
- **iOS Theme** - Wheel-based picker
- **Android Theme** - Material Design 3 clock face

### Primitives

Building blocks for custom implementations:
- `CalendarGrid` - Month calendar grid
- `WheelPicker` - Reusable wheel picker
- `ClockFace` - Analog clock dial

## Quick Example

```tsx
import { DatePicker, TimePicker } from '@dreamstack-us/kaal';
import { useState } from 'react';

export function MyComponent() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState({ hours: 9, minutes: 30 });

  return (
    <>
      <DatePicker
        value={date}
        onChange={setDate}
        theme="native"
        variant="calendar"
      />

      <TimePicker
        value={time}
        onChange={setTime}
        theme="ios"
        is24Hour={false}
      />
    </>
  );
}
```

## Requirements

- React Native 0.78.0+
- React 18.2.0+
- New Architecture enabled
- Peer dependencies:
  - `react-native-unistyles` ^3.0.0
  - `react-native-reanimated` ^3.17.0
  - `react-native-gesture-handler` ^2.20.0
  - `react-native-svg` ^13.0.0

## Next Steps

- [Getting Started](/docs/getting-started) - Installation and setup
- [DatePicker API](/docs/api/datepicker) - Full API reference
- [TimePicker API](/docs/api/timepicker) - Full API reference
- [Examples](/docs/examples/basic-datepicker) - Code examples
