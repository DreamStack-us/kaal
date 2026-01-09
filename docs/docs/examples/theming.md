---
sidebar_position: 5
---

# Theming

Kaal uses react-native-unistyles v3 for theming. Customize colors, spacing, and typography to match your app's design.

## Setup

First, configure the Kaal themes:

```tsx
// App.tsx or index.tsx
import { configureKaalThemes } from '@dreamstack-us/kaal-themes';

// Call this once before rendering
configureKaalThemes();
```

## Using Built-in Themes

Kaal includes light and dark themes that work out of the box:

```tsx
import { DatePicker } from '@dreamstack-us/kaal';
import { useColorScheme } from 'react-native';

export function ThemedDatePicker() {
  // Theme automatically responds to system color scheme
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      theme="custom" // Uses Unistyles theme
    />
  );
}
```

## Customizing Theme Colors

You can extend or override the default themes:

```tsx
import { lightTheme, darkTheme } from '@dreamstack-us/kaal-themes';
import { UnistylesRegistry } from 'react-native-unistyles';

const customLightTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: {
      default: '#c41e3a',    // Your brand color
      hover: '#e63950',
      pressed: '#8b1a1a',
    },
    datepicker: {
      ...lightTheme.colors.datepicker,
      cellSelected: '#c41e3a',
      cellToday: '#d4af37',
    },
  },
};

const customDarkTheme = {
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
  light: customLightTheme,
  dark: customDarkTheme,
});
```

## Theme Structure

### DatePicker Colors

```tsx
datepicker: {
  // Cell backgrounds
  cellBackground: string;
  cellSelected: string;
  cellToday: string;

  // Text colors
  textDefault: string;
  textSelected: string;
  textDisabled: string;
  textWeekend: string;

  // Header
  headerBackground: string;

  // Wheel picker
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
  clockMarker: string;

  // AM/PM toggle
  periodBackground: string;
  periodBackgroundSelected: string;
  periodText: string;
  periodTextSelected: string;

  // Time display
  timeFieldBackground: string;
  timeFieldBackgroundSelected: string;
  timeFieldText: string;
  timeFieldTextSelected: string;

  // Wheel picker
  wheelBackground: string;
  wheelSeparator: string;
  wheelText: string;
  wheelTextSelected: string;
}
```

## Platform-Specific Themes

Apply different themes based on platform:

```tsx
import { Platform } from 'react-native';
import { DatePicker } from '@dreamstack-us/kaal';

export function PlatformDatePicker() {
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      theme={Platform.select({
        ios: 'ios',
        android: 'android',
        default: 'custom',
      })}
    />
  );
}
```

## Dark Mode

Kaal automatically responds to system dark mode when using Unistyles:

```tsx
import { UnistylesRuntime } from 'react-native-unistyles';

// Manually toggle theme
UnistylesRuntime.setTheme('dark');

// Or let it follow system
UnistylesRuntime.setAdaptiveThemes(true);
```

## Example: Custom Brand Theme

```tsx
import { lightTheme, darkTheme, primitiveTokens } from '@dreamstack-us/kaal-themes';
import { UnistylesRegistry } from 'react-native-unistyles';

// Custom brand colors
const brandColors = {
  crimson: '#c41e3a',
  gold: '#d4af37',
  charcoal: '#1a1f2e',
  ivory: '#fffbf5',
};

const brandLightTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: {
      default: brandColors.ivory,
      elevated: '#ffffff',
      subtle: '#fff9e6',
    },
    primary: {
      default: brandColors.crimson,
      hover: '#e63950',
      pressed: '#8b1a1a',
    },
    datepicker: {
      ...lightTheme.colors.datepicker,
      cellSelected: brandColors.crimson,
      cellToday: brandColors.gold,
    },
    timepicker: {
      ...lightTheme.colors.timepicker,
      clockHand: brandColors.crimson,
      clockCenter: brandColors.gold,
    },
  },
};

const brandDarkTheme = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    background: {
      default: brandColors.charcoal,
      elevated: '#242938',
      subtle: '#2d3348',
    },
    primary: {
      default: brandColors.crimson,
      hover: '#e63950',
      pressed: '#8b1a1a',
    },
  },
};

UnistylesRegistry.addThemes({
  light: brandLightTheme,
  dark: brandDarkTheme,
}).addConfig({
  adaptiveThemes: true,
});
```
