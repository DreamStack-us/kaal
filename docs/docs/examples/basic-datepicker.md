---
sidebar_position: 1
---

# Basic DatePicker

A simple date picker with calendar view.

## Live Example

```SnackPlayer name=Basic%20DatePicker&dependencies=@dreamstack-us/kaal
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker, toISODateString } from '@dreamstack-us/kaal';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Selected: {toISODateString(selectedDate)}
      </Text>

      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        variant="calendar"
        weekStartsOn={0}
        themeOverrides={{
          primaryColor: '#3b82f6',
          cellSelectedColor: '#3b82f6',
          cellTodayColor: 'rgba(59, 130, 246, 0.15)',
          textColor: '#1e293b',
          textSelectedColor: '#ffffff',
          textDisabledColor: '#94a3b8',
          backgroundColor: '#ffffff',
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

### Basic Usage

```tsx
import { DatePicker, toISODateString } from '@dreamstack-us/kaal';

const [selectedDate, setSelectedDate] = useState(new Date());

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  variant="calendar"
  weekStartsOn={0}
  themeOverrides={{
    primaryColor: '#3b82f6',
    backgroundColor: '#ffffff',
    textColor: '#1e293b',
  }}
/>
```

### Week Start

Set which day starts the week using `weekStartsOn`:

```tsx
// Sunday first (US default)
<DatePicker weekStartsOn={0} ... />

// Monday first (Europe)
<DatePicker weekStartsOn={1} ... />
```

## Dark Theme Example

```SnackPlayer name=Dark%20DatePicker&dependencies=@dreamstack-us/kaal
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker, toISODateString } from '@dreamstack-us/kaal';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Selected: {toISODateString(selectedDate)}
      </Text>

      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        variant="calendar"
        weekStartsOn={0}
        themeOverrides={{
          primaryColor: '#22d3ee',
          cellSelectedColor: '#22d3ee',
          cellTodayColor: 'rgba(34, 211, 238, 0.2)',
          textColor: '#f8fafc',
          textSelectedColor: '#0f172a',
          textDisabledColor: '#64748b',
          textWeekendColor: '#94a3b8',
          backgroundColor: '#1e293b',
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
    backgroundColor: '#0f172a',
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
    color: '#94a3b8',
  },
});
```

## With Min/Max Date

```SnackPlayer name=DatePicker%20with%20Range&dependencies=@dreamstack-us/kaal
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker, toISODateString, addDays } from '@dreamstack-us/kaal';

export default function App() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  // Allow selection from today to 30 days in the future
  const minDate = today;
  const maxDate = addDays(today, 30);

  return (
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
        weekStartsOn={0}
        themeOverrides={{
          primaryColor: '#3b82f6',
          cellSelectedColor: '#3b82f6',
          textColor: '#1e293b',
          textDisabledColor: '#cbd5e1',
          backgroundColor: '#ffffff',
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
