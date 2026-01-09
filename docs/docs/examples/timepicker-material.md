---
sidebar_position: 4
---

import ExpoSnackEmbed from '@site/src/components/ExpoSnackEmbed';

# TimePicker (Material Style)

The Material-style TimePicker uses a clock face for intuitive time selection, following Material Design 3 guidelines.

## Try it Live

<ExpoSnackEmbed snackId="@dreamstack-us/kaal-timepicker-material" />

## Basic Usage

```tsx
import { TimePicker, type TimeValue } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MaterialTimePicker() {
  const [time, setTime] = useState<TimeValue>({
    hours: 14,
    minutes: 30,
  });

  const formatDisplay = (t: TimeValue) => {
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
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

```tsx
import { TimePicker, type TimeValue } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MaterialTimePicker24Hour() {
  const [time, setTime] = useState<TimeValue>({
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
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

```tsx
import { TimePicker, type TimeValue } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BusinessHoursTimePicker() {
  const [time, setTime] = useState<TimeValue>({
    hours: 9,
    minutes: 0,
  });

  const formatDisplay = (t: TimeValue) => {
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
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
