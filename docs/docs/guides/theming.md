---
sidebar_position: 2
---

# Theming Guide

Learn how to customize Kaal's appearance to match your app's design system.

## Overview

Kaal uses [react-native-unistyles](https://reactnativeunistyles.vercel.app/) v3 for theming. This provides:

- **Dark/Light mode** - Automatic or manual switching
- **Design tokens** - Colors, spacing, typography
- **Type safety** - Full TypeScript support
- **Performance** - Near-zero runtime cost

## Basic Setup

### 1. Configure Themes

```tsx
// App.tsx
import { configureKaalThemes } from '@dreamstack-us/kaal-themes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Initialize once at startup
configureKaalThemes();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app */}
    </GestureHandlerRootView>
  );
}
```

### 2. Use Theme-Aware Components

```tsx
import { DatePicker } from '@dreamstack-us/kaal';

// Use theme="custom" to apply Unistyles theme
<DatePicker
  value={date}
  onChange={setDate}
  theme="custom"
/>
```

## Built-in Themes

Kaal includes two pre-configured themes:

### Light Theme

```tsx
import { lightTheme } from '@dreamstack-us/kaal-themes';

// Light theme colors
lightTheme.colors.primary.default    // #3b82f6 (blue)
lightTheme.colors.background.default // #ffffff
lightTheme.colors.foreground.default // #0f172a
```

### Dark Theme

```tsx
import { darkTheme } from '@dreamstack-us/kaal-themes';

// Dark theme colors
darkTheme.colors.primary.default    // #60a5fa (lighter blue)
darkTheme.colors.background.default // #0f172a
darkTheme.colors.foreground.default // #f8fafc
```

## Custom Themes

### Extending Built-in Themes

```tsx
import { lightTheme, darkTheme } from '@dreamstack-us/kaal-themes';
import { UnistylesRegistry } from 'react-native-unistyles';

const myLightTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: {
      default: '#c41e3a',  // Your brand color
      hover: '#e63950',
      pressed: '#8b1a1a',
    },
  },
};

const myDarkTheme = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    primary: {
      default: '#e63950',
      hover: '#f06070',
      pressed: '#c41e3a',
    },
  },
};

UnistylesRegistry.addThemes({
  light: myLightTheme,
  dark: myDarkTheme,
}).addConfig({
  adaptiveThemes: true,
});
```

### Theme Token Reference

#### Colors

```tsx
colors: {
  // Backgrounds
  background: {
    default: string;   // Main background
    elevated: string;  // Cards, modals
    subtle: string;    // Secondary backgrounds
  };

  // Text
  foreground: {
    default: string;   // Primary text
    muted: string;     // Secondary text
    subtle: string;    // Tertiary text
  };

  // Accent colors
  primary: {
    default: string;
    hover: string;
    pressed: string;
  };

  // Borders
  border: {
    default: string;
    strong: string;
  };

  // DatePicker specific
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
  };

  // TimePicker specific
  timepicker: {
    clockBackground: string;
    clockHand: string;
    clockNumber: string;
    clockNumberSelected: string;
    clockCenter: string;
    clockMarker: string;
    periodBackground: string;
    periodBackgroundSelected: string;
    periodText: string;
    periodTextSelected: string;
    timeFieldBackground: string;
    timeFieldBackgroundSelected: string;
    timeFieldText: string;
    timeFieldTextSelected: string;
    wheelBackground: string;
    wheelSeparator: string;
    wheelText: string;
    wheelTextSelected: string;
  };
}
```

#### Spacing

```tsx
// spacing(multiplier) returns multiplier * 4
spacing: (n: number) => number;

// Examples
spacing(1)  // 4
spacing(2)  // 8
spacing(4)  // 16
spacing(6)  // 24
```

#### Border Radii

```tsx
radii: {
  cell: number;    // 9999 (full circle)
  card: number;    // 16
  button: number;  // 8
}
```

#### Typography

```tsx
typography: {
  dayCell: {
    fontSize: number;
    fontWeight: string;
  };
  dayHeader: {
    fontSize: number;
    fontWeight: string;
  };
  monthHeader: {
    fontSize: number;
    fontWeight: string;
  };
}
```

## Dark Mode

### Automatic (System Preference)

```tsx
UnistylesRegistry.addConfig({
  adaptiveThemes: true, // Follow system setting
});
```

### Manual Control

```tsx
import { UnistylesRuntime } from 'react-native-unistyles';

// Set specific theme
UnistylesRuntime.setTheme('dark');
UnistylesRuntime.setTheme('light');

// Get current theme
const currentTheme = UnistylesRuntime.themeName;
```

### Theme Toggle Component

```tsx
import { UnistylesRuntime, useStyles } from 'react-native-unistyles';
import { Switch, View, Text } from 'react-native';

function ThemeToggle() {
  const { theme } = useStyles();
  const isDark = UnistylesRuntime.themeName === 'dark';

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>Dark Mode</Text>
      <Switch
        value={isDark}
        onValueChange={(value) => {
          UnistylesRuntime.setTheme(value ? 'dark' : 'light');
        }}
      />
    </View>
  );
}
```

## Platform-Specific Theming

```tsx
import { Platform } from 'react-native';
import { iosTheme, androidTheme } from '@dreamstack-us/kaal-themes';

const platformTheme = Platform.select({
  ios: iosTheme,
  android: androidTheme,
  default: lightTheme,
});
```

## Primitive Tokens

Access low-level design tokens:

```tsx
import { primitiveTokens } from '@dreamstack-us/kaal-themes';

primitiveTokens.colors.blue[500]  // #3b82f6
primitiveTokens.spacing[4]        // 16
primitiveTokens.radii.lg          // 12
primitiveTokens.fontSizes.md      // 16
```

## Best Practices

1. **Configure once** - Call `configureKaalThemes()` at app startup
2. **Use semantic tokens** - Prefer `primary.default` over hardcoded colors
3. **Test both themes** - Verify appearance in light and dark mode
4. **Extend, don't replace** - Spread existing theme when customizing
