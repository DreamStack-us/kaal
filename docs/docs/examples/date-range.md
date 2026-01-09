---
sidebar_position: 2
---

# Date Range Selection

Examples for selecting date ranges.

## Live Example

```SnackPlayer name=Date%20Range%20Picker&dependencies=@dreamstack-us/kaal,@dreamstack-us/kaal-themes,react-native-unistyles
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DatePicker, toISODateString, addDays, KaalProvider } from '@dreamstack-us/kaal';
import { kaalNativeTheme } from '@dreamstack-us/kaal-themes';

export default function App() {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(addDays(today, 7));

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // If start date is after end date, update end date
    if (date > endDate) {
      setEndDate(addDays(date, 1));
    }
  };

  return (
    <KaalProvider theme={kaalNativeTheme}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Select Date Range</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Start Date</Text>
          <Text style={styles.value}>{toISODateString(startDate)}</Text>
          <DatePicker
            value={startDate}
            onChange={handleStartDateChange}
            variant="calendar"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>End Date</Text>
          <Text style={styles.value}>{toISODateString(endDate)}</Text>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            minDate={addDays(startDate, 1)}
            variant="calendar"
          />
        </View>
      </ScrollView>
    </KaalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
});
```

## Code Breakdown

### Linked Date Pickers

When using two date pickers for a range, link them so the end date is always after the start:

```tsx
const handleStartDateChange = (date: Date) => {
  setStartDate(date);
  if (date > endDate) {
    setEndDate(addDays(date, 1));
  }
};
```

### Constraining End Date

Use `minDate` to prevent selecting an end date before the start:

```tsx
<DatePicker
  value={endDate}
  onChange={setEndDate}
  minDate={addDays(startDate, 1)}
/>
```

## With Disabled Dates

```SnackPlayer name=Disabled%20Dates&dependencies=@dreamstack-us/kaal,@dreamstack-us/kaal-themes,react-native-unistyles
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker, toISODateString, parseISODate, KaalProvider } from '@dreamstack-us/kaal';
import { kaalNativeTheme } from '@dreamstack-us/kaal-themes';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Disable specific holidays
  const disabledDates = [
    parseISODate('2024-12-25'), // Christmas
    parseISODate('2024-12-26'), // Boxing Day
    parseISODate('2025-01-01'), // New Year
  ];

  return (
    <KaalProvider theme={kaalNativeTheme}>
      <View style={styles.container}>
        <Text style={styles.label}>
          Holidays are disabled
        </Text>
        <Text style={styles.selected}>
          Selected: {toISODateString(selectedDate)}
        </Text>

        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          disabledDates={disabledDates}
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
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  selected: {
    fontSize: 16,
    marginBottom: 16,
  },
});
```

## Next Steps

- [TimePicker iOS](/docs/examples/timepicker-ios) - iOS-style wheel time picker
- [TimePicker Material](/docs/examples/timepicker-material) - Material Design clock picker
