---
sidebar_position: 1
---

# Basic DatePicker

A simple date picker with calendar view.

## Calendar Variant

```tsx
import { DatePicker, toISODateString } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BasicDatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Selected: {toISODateString(selectedDate)}
      </Text>

      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        theme="native"
        variant="calendar"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
});
```

## Wheel Variant

```tsx
import { DatePicker, toISODateString } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WheelDatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Selected: {toISODateString(selectedDate)}
      </Text>

      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        theme="ios"
        variant="wheel"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
});
```

## With Min/Max Date

```tsx
import { DatePicker, toISODateString, addDays } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DatePickerWithRange() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  // Allow selection from today to 30 days in the future
  const minDate = today;
  const maxDate = addDays(today, 30);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
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
