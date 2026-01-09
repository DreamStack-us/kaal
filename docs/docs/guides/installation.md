---
sidebar_position: 1
---

# Installation

Detailed installation guide for Kaal.

## Requirements

Before installing Kaal, ensure your project meets these requirements:

- **React Native** 0.78.0 or higher
- **React** 18.2.0 or higher
- **New Architecture** enabled
- **Expo SDK 53+** (if using Expo)

## Install the Package

### npm

```bash
npm install @dreamstack-us/kaal
```

### yarn

```bash
yarn add @dreamstack-us/kaal
```

### bun

```bash
bun add @dreamstack-us/kaal
```

## Install Peer Dependencies

Kaal requires several peer dependencies:

```bash
npm install react-native-unistyles react-native-reanimated react-native-gesture-handler react-native-svg
```

### Peer Dependency Versions

| Package | Minimum Version |
|---------|-----------------|
| `react-native-unistyles` | ^3.0.0 |
| `react-native-reanimated` | ^3.17.0 |
| `react-native-gesture-handler` | ^2.20.0 |
| `react-native-svg` | ^13.0.0 |

## Configure Dependencies

### 1. React Native Reanimated

Add the Reanimated Babel plugin to `babel.config.js`:

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

:::warning Important
The Reanimated plugin must be listed **last** in the plugins array.
:::

### 2. React Native Gesture Handler

Wrap your app root with `GestureHandlerRootView`:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app */}
    </GestureHandlerRootView>
  );
}
```

### 3. Kaal Themes

Configure the Kaal theme system at app startup:

```tsx
import { configureKaalThemes } from '@dreamstack-us/kaal-themes';

// Call once before rendering any Kaal components
configureKaalThemes();
```

## Expo Setup

If you're using Expo, install dependencies with:

```bash
npx expo install react-native-unistyles react-native-reanimated react-native-gesture-handler react-native-svg
```

Expo automatically handles native linking and configuration.

## Verify Installation

Test that everything is working:

```tsx
import { DatePicker } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View } from 'react-native';

export function TestComponent() {
  const [date, setDate] = useState(new Date());

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <DatePicker
        value={date}
        onChange={setDate}
        theme="native"
        variant="calendar"
      />
    </View>
  );
}
```

## Troubleshooting

### "Unable to resolve module" errors

Clear Metro bundler cache:

```bash
npx react-native start --reset-cache
```

### Reanimated "worklet" errors

Ensure the Babel plugin is configured and you've rebuilt the app:

```bash
npx react-native start --reset-cache
cd ios && pod install && cd ..
npx react-native run-ios
```

### Gesture Handler not working

Make sure `GestureHandlerRootView` wraps your entire app, not just individual screens.

### Theme not applying

Verify `configureKaalThemes()` is called before any Kaal component renders.

## Next Steps

- [Getting Started](/docs/getting-started) - Basic usage examples
- [Theming Guide](/docs/guides/theming) - Customize appearance
- [API Reference](/docs/api/datepicker) - Full API documentation
