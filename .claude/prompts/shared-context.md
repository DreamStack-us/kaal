# Kaal Shared Context

## CRITICAL: Node Version Management

**ALWAYS run `nvm use` before any Node/npm/bun commands.**

This project uses nvm to manage Node versions. The `.nvmrc` file specifies the required version. Running commands with the wrong Node version will either fail or corrupt the setup.

```bash
# ALWAYS do this first in any terminal session
nvm use

# Then run your commands
bun install
bun run build
bun run dev
```

## Project Overview

**Kaal** is a high-performance React Native DatePicker library featuring:
- Native iOS/Android pickers via @expo/ui
- Custom cross-platform CalendarGrid
- Unistyles v3 theming
- Temporal API for date handling

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React Native 0.78+ (New Architecture only) |
| Platform | Expo SDK 53+ |
| Styling | Unistyles v3 |
| Animations | Reanimated 3.17+ |
| Gestures | Gesture Handler 2.20+ |
| Dates | Temporal API (via polyfill) |
| Validation | Zod |
| TypeScript | 5.7+ |
| Package Manager | Bun |
| Monorepo | Turbo |
| Linter | Biome |

## Code Style

- **Linter/Formatter**: Biome
- **Quotes**: Single quotes
- **Indentation**: 2 spaces
- **Exports**: Named exports only (no default exports)
- **Types**: Explicit types for public APIs

## Component Conventions

### File Structure

```
ComponentName/
├── index.ts              # Re-exports
├── ComponentName.tsx     # Base/shared
├── ComponentName.ios.tsx
├── ComponentName.android.tsx
├── ComponentName.web.tsx
└── ComponentName.styles.ts
```

### Props Pattern

```typescript
export interface ComponentNameProps {
  // Required first
  value: SomeType;
  onChange: (value: SomeType) => void;

  // Optional with defaults
  variant?: 'a' | 'b';  // default: 'a'
}
```

## Date Handling

**ALWAYS use Temporal API, NEVER native Date:**

```typescript
import { Temporal } from '@js-temporal/polyfill';

// PlainDate for date-only
const date = Temporal.PlainDate.from('2024-01-15');

// PlainYearMonth for month views
const month = Temporal.PlainYearMonth.from({ year: 2024, month: 1 });

// Comparisons
date.equals(other);
Temporal.PlainDate.compare(a, b);

// Navigation
date.add({ days: 1 });
date.subtract({ months: 1 });
```

## Bundle Size

- **Target**: <25kB for core package
- **Check**: `bun run size`
- **Strategy**: Tree-shakeable exports, no side effects

## Testing

```bash
bun test              # Run all tests
bun test --watch      # Watch mode
```

## Git Conventions

- **Commit format**: `type: description` or `TICKET-ID: description`
- **Types**: feat, fix, chore, docs, refactor, test, perf
- **Linear integration**: Include ticket ID for automation
