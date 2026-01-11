---
sidebar_position: 3
---

# TimePicker (iOS Style)

The iOS-style TimePicker uses spinning wheels for hour, minute, and AM/PM selection.

## Live Example

```SnackPlayer name=iOS%20TimePicker&dependencies=@dreamstack-us/kaal,react-native-svg
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimePicker } from '@dreamstack-us/kaal';

export default function App() {
  const [time, setTime] = useState({
    hours: 9,
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
        is24Hour={false}
        themeOverrides={{
          primaryColor: '#3b82f6',
          backgroundColor: '#f8fafc',
          wheelContainerBackground: '#ffffff',
          wheelTextColor: '#1e293b',
          wheelSeparatorColor: '#64748b',
          wheelSelectionHighlight: 'rgba(59, 130, 246, 0.1)',
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

## Dark Theme Example

```SnackPlayer name=iOS%20TimePicker%20Dark&dependencies=@dreamstack-us/kaal,react-native-svg
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimePicker } from '@dreamstack-us/kaal';

export default function App() {
  const [time, setTime] = useState({
    hours: 14,
    minutes: 30,
  });

  const formatDisplay = (t) => {
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
        is24Hour={true}
        themeOverrides={{
          primaryColor: '#22d3ee',
          backgroundColor: '#0f172a',
          wheelContainerBackground: '#1e293b',
          wheelTextColor: '#f8fafc',
          wheelSeparatorColor: '#94a3b8',
          wheelSelectionHighlight: 'rgba(34, 211, 238, 0.15)',
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
    marginBottom: 24,
    color: '#f8fafc',
  },
});
```

## With Minute Intervals

```SnackPlayer name=TimePicker%20Intervals&dependencies=@dreamstack-us/kaal,react-native-svg
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
        Select appointment time (15-minute slots)
      </Text>
      <Text style={styles.time}>{formatDisplay(time)}</Text>

      <TimePicker
        value={time}
        onChange={setTime}
        minuteInterval={15}
        is24Hour={false}
        themeOverrides={{
          primaryColor: '#10b981',
          backgroundColor: '#ecfdf5',
          wheelContainerBackground: '#ffffff',
          wheelTextColor: '#064e3b',
          wheelSeparatorColor: '#6ee7b7',
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
    backgroundColor: '#ecfdf5',
  },
  label: {
    fontSize: 14,
    color: '#065f46',
    marginBottom: 8,
    textAlign: 'center',
  },
  time: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 24,
    color: '#064e3b',
  },
});
```

## Next Steps

- [TimePicker Material](/docs/examples/timepicker-material) - Material Design clock picker
- [Theming](/docs/examples/theming) - Customize the appearance
