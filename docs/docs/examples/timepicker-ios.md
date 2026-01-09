---
sidebar_position: 3
---

# TimePicker (iOS Style)

The iOS-style TimePicker uses spinning wheels for hour, minute, and AM/PM selection.

## Basic Usage

```tsx
import { TimePicker, type TimeValue } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IOSTimePicker() {
  const [time, setTime] = useState<TimeValue>({
    hours: 9,
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
        theme="ios"
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

## 24-Hour Format

```tsx
import { TimePicker, type TimeValue } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TimePicker24Hour() {
  const [time, setTime] = useState<TimeValue>({
    hours: 14,
    minutes: 30,
  });

  const formatDisplay = (t: TimeValue) => {
    const hours = t.hours.toString().padStart(2, '0');
    const minutes = t.minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>24-Hour Format</Text>
      <Text style={styles.time}>{formatDisplay(time)}</Text>

      <TimePicker
        value={time}
        onChange={setTime}
        theme="ios"
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
    marginBottom: 24,
  },
});
```

## With Minute Intervals

```tsx
import { TimePicker, type TimeValue } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TimePickerWithIntervals() {
  const [time, setTime] = useState<TimeValue>({
    hours: 9,
    minutes: 0,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Select appointment time (15-minute slots)
      </Text>

      <TimePicker
        value={time}
        onChange={setTime}
        theme="ios"
        minuteInterval={15}
        is24Hour={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
});
```
