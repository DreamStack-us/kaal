---
sidebar_position: 2
---

# Date Range Selection

Select a date range with visual highlighting between start and end dates.

## Live Example

```SnackPlayer name=Date%20Range%20Picker&dependencies=@dreamstack-us/kaal,react-native-svg
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker, toISODateString } from '@dreamstack-us/kaal';

const pickerTheme = {
  primaryColor: '#3b82f6',
  cellSelectedColor: '#3b82f6',
  cellInRangeColor: 'rgba(59, 130, 246, 0.15)',
  cellTodayColor: 'rgba(59, 130, 246, 0.1)',
  textColor: '#1e293b',
  textSelectedColor: '#ffffff',
  textInRangeColor: '#3b82f6',
  textDisabledColor: '#cbd5e1',
  backgroundColor: '#ffffff',
  borderRadius: 16,
};

export default function App() {
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: null,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Date Range</Text>
      <Text style={styles.hint}>
        Tap to select start date, then tap again for end date
      </Text>

      <View style={styles.rangeDisplay}>
        <View style={styles.dateBox}>
          <Text style={styles.label}>Start</Text>
          <Text style={styles.value}>
            {range.startDate ? toISODateString(range.startDate) : '—'}
          </Text>
        </View>
        <Text style={styles.arrow}>→</Text>
        <View style={styles.dateBox}>
          <Text style={styles.label}>End</Text>
          <Text style={styles.value}>
            {range.endDate ? toISODateString(range.endDate) : '—'}
          </Text>
        </View>
      </View>

      <DatePicker
        selectionMode="range"
        startDate={range.startDate}
        endDate={range.endDate}
        onRangeChange={setRange}
        variant="calendar"
        weekStartsOn={0}
        themeOverrides={pickerTheme}
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1e293b',
  },
  hint: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  rangeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
  },
  dateBox: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  arrow: {
    fontSize: 20,
    color: '#94a3b8',
  },
});
```

## Code Breakdown

### Range Selection Mode

Use `selectionMode="range"` to enable range selection:

```tsx
<DatePicker
  selectionMode="range"
  startDate={range.startDate}
  endDate={range.endDate}
  onRangeChange={setRange}
  weekStartsOn={0}
  themeOverrides={pickerTheme}
/>
```

### Range State

The `onRangeChange` callback receives an object with `startDate` and `endDate`:

```tsx
const [range, setRange] = useState({
  startDate: new Date(),
  endDate: null,
});
```

### Selection UX

1. First tap sets the start date
2. Second tap sets the end date (if after start)
3. Tapping before start resets to new start
4. Dates between are visually highlighted

## With Disabled Dates

```SnackPlayer name=Disabled%20Dates&dependencies=@dreamstack-us/kaal,react-native-svg
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker, toISODateString } from '@dreamstack-us/kaal';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Disable weekends in current month (dynamically calculated)
  const getWeekendsInMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const weekends = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() === 0 || date.getDay() === 6) {
        weekends.push(date);
      }
    }
    return weekends;
  };

  const disabledDates = getWeekendsInMonth();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Weekends are disabled
      </Text>
      <Text style={styles.selected}>
        Selected: {toISODateString(selectedDate)}
      </Text>

      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        disabledDates={disabledDates}
        variant="calendar"
        weekStartsOn={0}
        themeOverrides={{
          primaryColor: '#ef4444',
          cellSelectedColor: '#ef4444',
          cellTodayColor: 'rgba(239, 68, 68, 0.15)',
          textColor: '#1e293b',
          textSelectedColor: '#ffffff',
          textDisabledColor: '#fca5a5',
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
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  selected: {
    fontSize: 16,
    marginBottom: 16,
    color: '#1e293b',
  },
});
```

## Next Steps

- [TimePicker iOS](/docs/examples/timepicker-ios) - iOS-style wheel time picker
- [TimePicker Material](/docs/examples/timepicker-material) - Material Design clock picker
