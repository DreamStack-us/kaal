---
sidebar_position: 2
---

# Getting Started

This guide will help you install and configure Kaal in your React Native project.

## Prerequisites

- React Native 0.78.0 or higher
- New Architecture enabled
- The following peer dependencies installed:
  - `react-native-unistyles` ^3.0.0
  - `react-native-reanimated` ^3.17.0
  - `react-native-gesture-handler` ^2.20.0
  - `react-native-svg` ^13.0.0

## Installation

### Using npm

```bash
npm install @dreamstack-us/kaal
```

### Using yarn

```bash
yarn add @dreamstack-us/kaal
```

### Using bun

```bash
bun add @dreamstack-us/kaal
```

## Peer Dependencies

If you haven't already, install the required peer dependencies:

```bash
npm install react-native-unistyles react-native-reanimated react-native-gesture-handler react-native-svg
```

### Configure Reanimated

Add the Reanimated babel plugin to your `babel.config.js`:

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

### Configure Gesture Handler

Wrap your app with `GestureHandlerRootView`:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app content */}
    </GestureHandlerRootView>
  );
}
```

## Configure Themes

Initialize the Kaal theme system before rendering any Kaal components:

```tsx
import { configureKaalThemes } from '@dreamstack-us/kaal-themes';

// Call this once at app startup
configureKaalThemes();
```

## Basic Usage

### DatePicker

```tsx
import { DatePicker } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View } from 'react-native';

export function DatePickerExample() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        theme="native"
        variant="calendar"
      />
    </View>
  );
}
```

### TimePicker

```tsx
import { TimePicker, type TimeValue } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View } from 'react-native';

export function TimePickerExample() {
  const [selectedTime, setSelectedTime] = useState<TimeValue>({
    hours: 9,
    minutes: 30,
  });

  return (
    <View>
      <TimePicker
        value={selectedTime}
        onChange={setSelectedTime}
        theme="ios"
        is24Hour={false}
      />
    </View>
  );
}
```

## Platform Differences

Kaal automatically adapts to each platform:

| Feature | iOS | Android | Web |
|---------|-----|---------|-----|
| DatePicker (native) | UIDatePicker | MaterialDatePicker | WheelPicker |
| TimePicker (ios theme) | UIDatePicker | WheelPicker | WheelPicker |
| TimePicker (android theme) | ClockFace | ClockFace | ClockFace |

## Next Steps

- [DatePicker API](/docs/api/datepicker) - Explore all DatePicker props
- [TimePicker API](/docs/api/timepicker) - Explore all TimePicker props
- [Theming Guide](/docs/guides/theming) - Customize colors and styles
- [Examples](/docs/examples/basic-datepicker) - See more code examples
