---
sidebar_position: 4
---

# TimePicker (Material Style)

The Material-style TimePicker uses a clock face for intuitive time selection, following Material Design 3 guidelines.

## Live Example

```SnackPlayer name=Material%20TimePicker&dependencies=@dreamstack-us/kaal,react-native-svg
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimePicker } from '@dreamstack-us/kaal';

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
    <View style={styles.container}>
      <Text style={styles.label}>Selected Time</Text>
      <Text style={styles.time}>{formatDisplay(time)}</Text>

      <TimePicker
        value={time}
        onChange={setTime}
        theme="android"
        is24Hour={false}
        themeOverrides={{
          primaryColor: '#6366f1',
          backgroundColor: '#ffffff',
          clockBackground: '#f1f5f9',
          clockHandColor: '#6366f1',
          clockTextColor: '#1e293b',
          clockTextSelectedColor: '#ffffff',
          clockCenterColor: '#6366f1',
          periodBackground: '#f1f5f9',
          periodActiveBackground: '#e0e7ff',
          periodTextColor: '#64748b',
          periodTextActiveColor: '#6366f1',
          timeFieldBackground: '#f1f5f9',
          timeFieldActiveBackground: '#6366f1',
          textColor: '#1e293b',
          textActiveColor: '#ffffff',
          borderRadius: 16,
        }}
      />
    </View>
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
    color: '#1e293b',
  },
});
```

## Dark Theme Clock

```SnackPlayer name=Material%20TimePicker%20Dark&dependencies=@dreamstack-us/kaal,react-native-svg
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimePicker } from '@dreamstack-us/kaal';

export default function App() {
  const [time, setTime] = useState({
    hours: 14,
    minutes: 30,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>24-Hour Clock</Text>
      <Text style={styles.time}>
        {time.hours.toString().padStart(2, '0')}:
        {time.minutes.toString().padStart(2, '0')}
      </Text>

      <TimePicker
        value={time}
        onChange={setTime}
        theme="android"
        is24Hour={true}
        themeOverrides={{
          primaryColor: '#a855f7',
          backgroundColor: '#0f172a',
          clockBackground: '#1e293b',
          clockHandColor: '#a855f7',
          clockTextColor: '#f8fafc',
          clockTextSelectedColor: '#ffffff',
          clockCenterColor: '#a855f7',
          periodBackground: '#1e293b',
          periodActiveBackground: 'rgba(168, 85, 247, 0.2)',
          periodTextColor: '#94a3b8',
          periodTextActiveColor: '#a855f7',
          timeFieldBackground: '#1e293b',
          timeFieldActiveBackground: '#a855f7',
          textColor: '#f8fafc',
          textActiveColor: '#ffffff',
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  label: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  time: {
    fontSize: 32,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
    marginBottom: 24,
    color: '#f8fafc',
  },
});
```

## Business Hours Constraint

```SnackPlayer name=Business%20Hours%20TimePicker&dependencies=@dreamstack-us/kaal,react-native-svg
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimePicker } from '@dreamstack-us/kaal';

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
    <View style={styles.container}>
      <Text style={styles.label}>
        Business Hours: 9:00 AM - 5:00 PM
      </Text>
      <Text style={styles.time}>{formatDisplay(time)}</Text>

      <TimePicker
        value={time}
        onChange={setTime}
        theme="android"
        minTime={{ hours: 9, minutes: 0 }}
        maxTime={{ hours: 17, minutes: 0 }}
        is24Hour={false}
        themeOverrides={{
          primaryColor: '#f97316',
          backgroundColor: '#fffbeb',
          clockBackground: '#fef3c7',
          clockHandColor: '#f97316',
          clockTextColor: '#78350f',
          clockTextSelectedColor: '#ffffff',
          clockCenterColor: '#f97316',
          periodBackground: '#fef3c7',
          periodActiveBackground: '#fed7aa',
          periodTextColor: '#92400e',
          periodTextActiveColor: '#f97316',
          timeFieldBackground: '#fef3c7',
          timeFieldActiveBackground: '#f97316',
          textColor: '#78350f',
          textActiveColor: '#ffffff',
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fffbeb',
  },
  label: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 4,
  },
  time: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 24,
    color: '#78350f',
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
