# Kaal Codebase Overview

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    packages/themes                           │
│            (Unistyles v3 - Cross-Platform Theming)           │
├─────────────────────────────────────────────────────────────┤
│                     packages/core                            │
│          DatePicker, CalendarGrid, WheelPicker               │
│          Platform: iOS / Android / Web                       │
├─────────────────────────────────────────────────────────────┤
│                      docs/ site                              │
│            (Docusaurus + SnackPlayer embeds)                 │
└─────────────────────────────────────────────────────────────┘
```

## Key Directories

### packages/core/ (Main Library)

```
packages/core/
├── src/
│   ├── components/
│   │   ├── DatePicker/      # Main component with platform files
│   │   ├── CalendarGrid/    # Calendar view with FlatList
│   │   └── WheelPicker/     # Wheel selector with Reanimated
│   ├── hooks/
│   │   ├── useDatePicker.ts # State management hook
│   │   └── useCalendar.ts   # Calendar logic hook
│   ├── types/
│   │   └── datepicker.ts    # TypeScript definitions
│   ├── utils/
│   │   ├── temporal.ts      # Temporal API helpers
│   │   └── validation.ts    # Zod schemas
│   └── index.ts             # Public exports
├── lib/                     # Build output
└── package.json
```

### packages/themes/ (Theme System)

```
packages/themes/
├── src/
│   ├── themes/
│   │   ├── light.ts
│   │   ├── dark.ts
│   │   ├── ios.ts
│   │   └── android.ts
│   ├── tokens/
│   │   ├── primitive.ts     # Raw values
│   │   ├── semantic.ts      # Named tokens
│   │   └── component.ts     # Component-specific
│   ├── breakpoints.ts
│   └── index.ts
└── package.json
```

## Styling Pattern

Uses **react-native-unistyles** (NOT StyleSheet.create):

```tsx
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
}));
```

## Build Commands

```bash
bun run build        # Build packages
bun run typecheck    # TypeScript check
bun run lint         # Biome lint
bun run size         # Bundle size check
bun test             # Run tests
```

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react-native | >=0.78.0 | Core framework |
| react-native-unistyles | ^3.0.0 | Styling |
| react-native-reanimated | >=3.17.0 | Animations |
| react-native-gesture-handler | >=2.20.0 | Gestures |
| @js-temporal/polyfill | >=0.4.4 | Date handling |
| zod | >=3.24.0 | Validation |
