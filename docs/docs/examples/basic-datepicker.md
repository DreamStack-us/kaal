---
sidebar_position: 1
---

# Basic DatePicker

A simple date picker with calendar view.

## Live Example

```SnackPlayer name=Basic%20DatePicker&dependencies=@dreamstack-us/kaal,@dreamstack-us/kaal-themes,react-native-unistyles
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker, toISODateString, KaalProvider } from '@dreamstack-us/kaal';
import { kaalNativeTheme } from '@dreamstack-us/kaal-themes';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <KaalProvider theme={kaalNativeTheme}>
      <View style={styles.container}>
        <Text style={styles.label}>
          Selected: {toISODateString(selectedDate)}
        </Text>

        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          variant="calendar"
        />
      </View>
    </KaalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
});
```

## Code Breakdown

### Setup with KaalProvider

Wrap your app with `KaalProvider` and a theme:

```tsx
import { KaalProvider } from '@dreamstack-us/kaal';
import { kaalNativeTheme } from '@dreamstack-us/kaal-themes';

<KaalProvider theme={kaalNativeTheme}>
  {/* Your components */}
</KaalProvider>
```

### Basic Usage

```tsx
import { DatePicker, toISODateString } from '@dreamstack-us/kaal';

const [selectedDate, setSelectedDate] = useState(new Date());

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  variant="calendar"
/>
```

## Wheel Variant

```SnackPlayer name=Wheel%20DatePicker&dependencies=@dreamstack-us/kaal,@dreamstack-us/kaal-themes,react-native-unistyles
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker, toISODateString, KaalProvider } from '@dreamstack-us/kaal';
import { kaalIOSTheme } from '@dreamstack-us/kaal-themes';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <KaalProvider theme={kaalIOSTheme}>
      <View style={styles.container}>
        <Text style={styles.label}>
          Selected: {toISODateString(selectedDate)}
        </Text>

        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          variant="wheel"
        />
      </View>
    </KaalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
});
```

## With Min/Max Date

```SnackPlayer name=DatePicker%20with%20Range&dependencies=@dreamstack-us/kaal,@dreamstack-us/kaal-themes,react-native-unistyles
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker, toISODateString, addDays, KaalProvider } from '@dreamstack-us/kaal';
import { kaalNativeTheme } from '@dreamstack-us/kaal-themes';

export default function App() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  // Allow selection from today to 30 days in the future
  const minDate = today;
  const maxDate = addDays(today, 30);

  return (
    <KaalProvider theme={kaalNativeTheme}>
      <View style={styles.container}>
        <Text style={styles.hint}>
          Select a date within the next 30 days
        </Text>
        <Text style={styles.selected}>
          Selected: {toISODateString(selectedDate)}
        </Text>

        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </View>
    </KaalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  hint: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  selected: {
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
});
```

## Next Steps

- [TimePicker iOS](/docs/examples/timepicker-ios) - iOS-style wheel time picker
- [TimePicker Material](/docs/examples/timepicker-material) - Material Design clock picker
- [Theming](/docs/examples/theming) - Customize the appearance
