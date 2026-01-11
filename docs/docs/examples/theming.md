---
sidebar_position: 5
---

# Theming

Kaal provides two approaches to theming: **themeOverrides prop** (recommended for web and flexible theming) and **KaalProvider** (for native apps using react-native-unistyles).

## themeOverrides (Recommended)

The `themeOverrides` prop lets you customize colors directly on the component without any provider setup. This is the recommended approach for:
- Web applications (Next.js, Expo Web)
- Integrating with your existing design system
- Quick customization without theme providers

## Live Example - Light/Dark Mode Toggle

```SnackPlayer name=Theme%20Toggle%20Example&dependencies=@dreamstack-us/kaal
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DatePicker, TimePicker, toISODateString } from '@dreamstack-us/kaal';

// Define theme colors for light and dark modes
const themes = {
  light: {
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    primary: '#3b82f6',
    primaryMuted: 'rgba(59, 130, 246, 0.15)',
  },
  dark: {
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    textSecondary: '#94a3b8',
    primary: '#22d3ee',
    primaryMuted: 'rgba(34, 211, 238, 0.15)',
  },
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({ hours: 9, minutes: 30 });
  const [isDark, setIsDark] = useState(false);

  const colors = isDark ? themes.dark : themes.light;

  // Build themeOverrides from current theme
  const datePickerOverrides = {
    primaryColor: colors.primary,
    cellSelectedColor: colors.primary,
    cellTodayColor: colors.primaryMuted,
    textColor: colors.text,
    textSelectedColor: '#ffffff',
    textDisabledColor: colors.textSecondary,
    textWeekendColor: colors.textSecondary,
    backgroundColor: colors.surface,
    borderRadius: 16,
  };

  const timePickerOverrides = {
    primaryColor: colors.primary,
    backgroundColor: colors.surface,
    wheelContainerBackground: colors.surface,
    wheelTextColor: colors.text,
    wheelSeparatorColor: colors.textSecondary,
    borderRadius: 16,
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Theming Demo
        </Text>
        <Pressable
          style={[styles.toggleButton, { backgroundColor: colors.surface }]}
          onPress={() => setIsDark(!isDark)}
        >
          <Text style={[styles.toggleText, { color: colors.text }]}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </Text>
        </Pressable>
      </View>

      <Text style={[styles.label, { color: colors.textSecondary }]}>
        Selected: {toISODateString(selectedDate)}
      </Text>

      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        variant="calendar"
        weekStartsOn={0}
        themeOverrides={datePickerOverrides}
      />

      <Text style={[styles.label, { color: colors.textSecondary, marginTop: 24 }]}>
        Time: {selectedTime.hours}:{String(selectedTime.minutes).padStart(2, '0')}
      </Text>

      <TimePicker
        value={selectedTime}
        onChange={setSelectedTime}
        minuteInterval={15}
        themeOverrides={timePickerOverrides}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    marginBottom: 12,
  },
});
```

## Integrating with Your Design System

The `themeOverrides` approach makes it easy to integrate Kaal with your existing design system. Here's an example of how you might integrate with a theme from your app:

```tsx
import { DatePicker, TimePicker, type TimeValue } from '@dreamstack-us/kaal';
import { useTheme } from 'your-theme-library'; // e.g., unistyles, styled-components, etc.

function ScheduleModal() {
  const { theme } = useTheme();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState<TimeValue>({ hours: 9, minutes: 0 });

  return (
    <View>
      <DatePicker
        value={date}
        onChange={setDate}
        weekStartsOn={0}
        themeOverrides={{
          primaryColor: theme.colors.primary,
          cellSelectedColor: theme.colors.primary,
          cellTodayColor: theme.colors.primaryMuted,
          textColor: theme.colors.text,
          textSelectedColor: theme.colors.textOnPrimary,
          textDisabledColor: theme.colors.textTertiary,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
        }}
      />

      <TimePicker
        value={time}
        onChange={setTime}
        minuteInterval={15}
        themeOverrides={{
          primaryColor: theme.colors.primary,
          wheelContainerBackground: theme.colors.surface,
          wheelTextColor: theme.colors.text,
          backgroundColor: theme.colors.surface,
        }}
      />
    </View>
  );
}
```

## Brand Colors Example

Customize the pickers to match your brand:

```SnackPlayer name=Brand%20Colors&dependencies=@dreamstack-us/kaal
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker, toISODateString } from '@dreamstack-us/kaal';

// Example: Holiday-themed colors
const holidayTheme = {
  primaryColor: '#c41e3a',      // Christmas red
  cellSelectedColor: '#c41e3a',
  cellTodayColor: '#2d5a27',    // Christmas green
  textColor: '#2d1810',
  textSelectedColor: '#ffffff',
  textWeekendColor: '#c41e3a',
  backgroundColor: '#fffbf5',   // Warm white
  borderRadius: 20,
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎄 Holiday Scheduler</Text>

      <Text style={styles.label}>
        Selected: {toISODateString(selectedDate)}
      </Text>

      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        variant="calendar"
        weekStartsOn={0}
        themeOverrides={holidayTheme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fffbf5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d1810',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 12,
    color: '#6b5344',
  },
});
```

## Week Start Configuration

Use `weekStartsOn` to set the first day of the week:

```tsx
// Sunday first (US, most of the Americas, Japan)
<DatePicker weekStartsOn={0} ... />

// Monday first (Europe, most of Asia, Australia)
<DatePicker weekStartsOn={1} ... />
```

## KaalProvider (Alternative)

For native apps using react-native-unistyles, you can also use the theme provider approach:

```tsx
import { KaalProvider } from '@dreamstack-us/kaal';
import { kaalNativeTheme } from '@dreamstack-us/kaal-themes';

export default function App() {
  return (
    <KaalProvider theme={kaalNativeTheme}>
      {/* Your app */}
    </KaalProvider>
  );
}
```

### Built-in Themes

```tsx
import {
  kaalNativeTheme,   // Cross-platform native look
  kaalIOSTheme,      // iOS-specific styling
  kaalMaterialTheme, // Material Design 3
} from '@dreamstack-us/kaal-themes';
```

## Next Steps

- [Basic DatePicker](/docs/examples/basic-datepicker) - Get started with date selection
- [TimePicker iOS](/docs/examples/timepicker-ios) - iOS-style wheel picker
- [DatePicker API](/docs/api/datepicker) - Full API reference
