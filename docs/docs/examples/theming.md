---
sidebar_position: 5
---

# Theming

Kaal uses react-native-unistyles v3 for theming. Customize colors, spacing, and typography to match your app's design.

## Live Example

```SnackPlayer name=Theming%20Example&dependencies=@dreamstack-us/kaal,@dreamstack-us/kaal-themes,react-native-unistyles
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DatePicker, toISODateString, KaalProvider } from '@dreamstack-us/kaal';
import { kaalNativeTheme, kaalIOSTheme, kaalMaterialTheme } from '@dreamstack-us/kaal-themes';

const themes = {
  native: kaalNativeTheme,
  ios: kaalIOSTheme,
  material: kaalMaterialTheme,
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTheme, setActiveTheme] = useState('native');

  return (
    <KaalProvider theme={themes[activeTheme]}>
      <View style={styles.container}>
        <Text style={styles.title}>Theme Switcher</Text>

        <View style={styles.themeButtons}>
          {Object.keys(themes).map((themeName) => (
            <Pressable
              key={themeName}
              style={[
                styles.button,
                activeTheme === themeName && styles.buttonActive,
              ]}
              onPress={() => setActiveTheme(themeName)}
            >
              <Text style={[
                styles.buttonText,
                activeTheme === themeName && styles.buttonTextActive,
              ]}>
                {themeName}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>
          Selected: {toISODateString(selectedDate)}
        </Text>

        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
  },
  buttonActive: {
    backgroundColor: '#3b82f6',
  },
  buttonText: {
    color: '#64748b',
    fontWeight: '500',
  },
  buttonTextActive: {
    color: '#ffffff',
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
});
```

## Setup

Wrap your app with `KaalProvider` and pass a theme:

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

## Built-in Themes

Kaal includes three ready-to-use themes:

```tsx
import {
  kaalNativeTheme,   // Cross-platform native look
  kaalIOSTheme,      // iOS-specific styling
  kaalMaterialTheme, // Material Design 3
} from '@dreamstack-us/kaal-themes';
```

## Custom Themes

Create your own theme by extending the base:

```tsx
import { createKaalTheme } from '@dreamstack-us/kaal-themes';

const customTheme = createKaalTheme({
  colors: {
    primary: '#c41e3a',    // Your brand color
    background: '#fffbf5', // App background
    surface: '#ffffff',    // Card/elevated surfaces
    text: '#2d1810',       // Primary text
    textSecondary: '#6b5344',
  },
  datepicker: {
    cellSelected: '#c41e3a',
    cellToday: '#d4af37',
  },
  timepicker: {
    clockHand: '#c41e3a',
    clockCenter: '#d4af37',
  },
});
```

## Theme Structure

### DatePicker Colors

```tsx
datepicker: {
  cellBackground: string;
  cellSelected: string;
  cellToday: string;
  textDefault: string;
  textSelected: string;
  textDisabled: string;
  textWeekend: string;
  headerBackground: string;
  wheelHighlight: string;
}
```

### TimePicker Colors

```tsx
timepicker: {
  // Clock face
  clockBackground: string;
  clockHand: string;
  clockNumber: string;
  clockNumberSelected: string;
  clockCenter: string;

  // AM/PM toggle
  periodBackground: string;
  periodBackgroundSelected: string;
  periodText: string;
  periodTextSelected: string;

  // Wheel picker
  wheelBackground: string;
  wheelText: string;
  wheelTextSelected: string;
}
```

## Dark Mode

Handle dark mode by switching themes based on color scheme:

```tsx
import { useColorScheme } from 'react-native';
import { kaalNativeTheme, kaalNativeDarkTheme } from '@dreamstack-us/kaal-themes';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? kaalNativeDarkTheme : kaalNativeTheme;

  return (
    <KaalProvider theme={theme}>
      {/* Your app */}
    </KaalProvider>
  );
}
```

## Next Steps

- [Basic DatePicker](/docs/examples/basic-datepicker) - Get started with date selection
- [TimePicker iOS](/docs/examples/timepicker-ios) - iOS-style wheel picker
