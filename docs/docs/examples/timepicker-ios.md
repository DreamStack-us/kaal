---
sidebar_position: 3
---

# TimePicker (iOS Style)

The iOS-style TimePicker uses spinning wheels for hour, minute, and AM/PM selection.

## Live Example

```SnackPlayer name=iOS%20TimePicker&dependencies=@dreamstack-us/kaal,@dreamstack-us/kaal-themes,react-native-unistyles
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimePicker, KaalProvider } from '@dreamstack-us/kaal';
import { kaalIOSTheme } from '@dreamstack-us/kaal-themes';

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
    <KaalProvider theme={kaalIOSTheme}>
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

## 24-Hour Format

```SnackPlayer name=iOS%20TimePicker%2024h&dependencies=@dreamstack-us/kaal,@dreamstack-us/kaal-themes,react-native-unistyles
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimePicker, KaalProvider } from '@dreamstack-us/kaal';
import { kaalIOSTheme } from '@dreamstack-us/kaal-themes';

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
    <KaalProvider theme={kaalIOSTheme}>
      <View style={styles.container}>
        <Text style={styles.label}>24-Hour Format</Text>
        <Text style={styles.time}>{formatDisplay(time)}</Text>

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
    marginBottom: 24,
  },
});
```

## With Minute Intervals

```SnackPlayer name=TimePicker%20Intervals&dependencies=@dreamstack-us/kaal,@dreamstack-us/kaal-themes,react-native-unistyles
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimePicker, KaalProvider } from '@dreamstack-us/kaal';
import { kaalIOSTheme } from '@dreamstack-us/kaal-themes';

export default function App() {
  const [time, setTime] = useState({
    hours: 9,
    minutes: 0,
  });

  return (
    <KaalProvider theme={kaalIOSTheme}>
      <View style={styles.container}>
        <Text style={styles.label}>
          Select appointment time (15-minute slots)
        </Text>

        <TimePicker
          value={time}
          onChange={setTime}
          minuteInterval={15}
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
    backgroundColor: '#f8fafc',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
});
```

## Next Steps

- [TimePicker Material](/docs/examples/timepicker-material) - Material Design clock picker
- [Theming](/docs/examples/theming) - Customize the appearance
