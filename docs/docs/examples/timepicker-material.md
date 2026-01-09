---
sidebar_position: 4
---

# TimePicker (Material Style)

The Material-style TimePicker uses a clock face for intuitive time selection, following Material Design 3 guidelines.

## Live Example

```SnackPlayer name=Material%20TimePicker&dependencies=@dreamstack-us/kaal,@dreamstack-us/kaal-themes,react-native-unistyles
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimePicker, KaalProvider } from '@dreamstack-us/kaal';
import { kaalMaterialTheme } from '@dreamstack-us/kaal-themes';

export default function App() {
  const [time, setTime] = useState({
    hours: 14,
    minutes: 30,
  });

  const formatDisplay = (t) => {
    const hour12 = t.hours % 12 || 12;
    const period = t.hours >= 12 ? 'PM' : 'AM';
    const minutes = t.minutes.toString().padStart(2, '0');
    return `${hour12}:${minutes} ${period}`;
  };

  return (
    <KaalProvider theme={kaalMaterialTheme}>
      <View style={styles.container}>
        <Text style={styles.label}>Selected Time</Text>
        <Text style={styles.time}>{formatDisplay(time)}</Text>

        <TimePicker
          value={time}
          onChange={setTime}
          is24Hour={false}
        />
      </View>
    </KaalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 24,
  },
});
```

## 24-Hour Clock Face

```SnackPlayer name=Material%20TimePicker%2024h&dependencies=@dreamstack-us/kaal,@dreamstack-us/kaal-themes,react-native-unistyles
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimePicker, KaalProvider } from '@dreamstack-us/kaal';
import { kaalMaterialTheme } from '@dreamstack-us/kaal-themes';

export default function App() {
  const [time, setTime] = useState({
    hours: 14,
    minutes: 30,
  });

  return (
    <KaalProvider theme={kaalMaterialTheme}>
      <View style={styles.container}>
        <Text style={styles.label}>24-Hour Clock</Text>
        <Text style={styles.time}>
          {time.hours.toString().padStart(2, '0')}:
          {time.minutes.toString().padStart(2, '0')}
        </Text>

        <TimePicker
          value={time}
          onChange={setTime}
          is24Hour={true}
        />
      </View>
    </KaalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 32,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
    marginBottom: 24,
  },
});
```

## Business Hours Constraint

```SnackPlayer name=Business%20Hours%20TimePicker&dependencies=@dreamstack-us/kaal,@dreamstack-us/kaal-themes,react-native-unistyles
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimePicker, KaalProvider } from '@dreamstack-us/kaal';
import { kaalMaterialTheme } from '@dreamstack-us/kaal-themes';

export default function App() {
  const [time, setTime] = useState({
    hours: 9,
    minutes: 0,
  });

  const formatDisplay = (t) => {
    const hour12 = t.hours % 12 || 12;
    const period = t.hours >= 12 ? 'PM' : 'AM';
    const minutes = t.minutes.toString().padStart(2, '0');
    return `${hour12}:${minutes} ${period}`;
  };

  return (
    <KaalProvider theme={kaalMaterialTheme}>
      <View style={styles.container}>
        <Text style={styles.label}>
          Business Hours: 9:00 AM - 5:00 PM
        </Text>
        <Text style={styles.time}>{formatDisplay(time)}</Text>

        <TimePicker
          value={time}
          onChange={setTime}
          minTime={{ hours: 9, minutes: 0 }}
          maxTime={{ hours: 17, minutes: 0 }}
          is24Hour={false}
        />
      </View>
    </KaalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 24,
  },
});
```

## Clock Face Behavior

The Material clock face operates in two phases:

1. **Hour Selection**: Tap or drag to select the hour on the outer ring (1-12) or inner ring (13-24 in 24h mode)
2. **Minute Selection**: After hour selection, the clock transitions to minute mode with 5-minute markers

The clock hand animates smoothly as you drag, and snaps to the nearest valid position on release.

## Next Steps

- [TimePicker iOS](/docs/examples/timepicker-ios) - iOS-style wheel picker
- [Theming](/docs/examples/theming) - Customize the appearance
