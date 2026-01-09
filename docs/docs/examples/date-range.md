---
sidebar_position: 2
---

# Date Range Selection

Examples for selecting date ranges.

## Start and End Date Pickers

```tsx
import { DatePicker, toISODateString, addDays } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DateRangePicker() {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(addDays(today, 7));

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    // If start date is after end date, update end date
    if (date > endDate) {
      setEndDate(addDays(date, 1));
    }
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Date Range</Text>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Start Date</Text>
          <Text style={styles.value}>{toISODateString(startDate)}</Text>
          <DatePicker
            value={startDate}
            onChange={handleStartDateChange}
            variant="calendar"
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>End Date</Text>
          <Text style={styles.value}>{toISODateString(endDate)}</Text>
          <DatePicker
            value={endDate}
            onChange={handleEndDateChange}
            minDate={addDays(startDate, 1)}
            variant="calendar"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  pickerContainer: {
    flex: 1,
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

## With Disabled Dates

```tsx
import { DatePicker, toISODateString, parseISODate } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DatePickerWithDisabledDates() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Disable weekends and specific holidays
  const disabledDates = [
    parseISODate('2024-12-25'), // Christmas
    parseISODate('2024-12-26'), // Boxing Day
    parseISODate('2024-01-01'), // New Year
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Holidays and some dates are disabled
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
  },
});
```
