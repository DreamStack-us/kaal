# @dreamstack/kaal

High-performance React Native DatePicker with Unistyles v3, New Architecture-only, featuring native SwiftUI/Jetpack Compose pickers and pixel-perfect web implementations.

## Requirements

- React Native 0.78+
- New Architecture enabled
- Expo SDK 53+ (for native date pickers)

## Installation

```bash
bun add @dreamstack/kaal
```

### Peer Dependencies

```bash
bun add react-native-unistyles react-native-reanimated react-native-gesture-handler @js-temporal/polyfill zod
```

## Configuration

### Babel Configuration

Add to your `babel.config.js`:

```javascript
const unistylesPluginOptions = {
  root: 'src', // or 'app' for Expo Router
  autoProcessPaths: ['node_modules/@dreamstack/kaal'],
};

module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['react-native-unistyles/plugin', unistylesPluginOptions],
    'react-native-reanimated/plugin',
  ],
};
```

### Theme Configuration

Configure themes before rendering any Kaal component:

```typescript
import { configureKaalThemes } from '@dreamstack/kaal/themes';

configureKaalThemes();
```

## Usage

```typescript
import React, { useState } from 'react';
import { Temporal } from '@js-temporal/polyfill';
import { DatePicker } from '@dreamstack/kaal';

export default function App() {
  const [date, setDate] = useState(Temporal.Now.plainDateISO());

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      theme="native"
      variant="wheel"
    />
  );
}
```

## Development

```bash
# Clone and install
git clone https://github.com/dreamstack/kaal.git
cd kaal
bun install

# Development
bun run dev:expo     # Run Expo example
bun run dev:web      # Run Next.js example

# Build
bun run build        # Build all packages
bun run typecheck    # Type check
bun run lint         # Lint
bun run test         # Run tests

# Release
bun run changeset    # Create changeset
bun run release      # Build and publish
```

## License

MIT
