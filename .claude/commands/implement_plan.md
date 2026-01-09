# Implement Plan

You are tasked with implementing an approved technical plan from `thoughts/shared/plans/`.

## Getting Started

1. **Read the plan completely** from the provided path
2. **Check for existing checkmarks** (`- [x]`) to identify completed phases
3. **Read all files mentioned in the plan FULLY** before making changes
4. **Create a todo list** to track progress

## Kaal File Organization

### Component Structure
```
packages/core/src/components/[ComponentName]/
├── index.ts              # Exports
├── [ComponentName].tsx   # Base/shared implementation
├── [ComponentName].ios.tsx      # iOS-specific
├── [ComponentName].android.tsx  # Android-specific
├── [ComponentName].web.tsx      # Web-specific
└── [ComponentName].styles.ts    # Unistyles stylesheet
```

### Required Patterns

**Unistyles (NOT StyleSheet.create):**
```typescript
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  },
}));
```

**Temporal for dates:**
```typescript
import { Temporal } from '@js-temporal/polyfill';
// Use Temporal.PlainDate, never native Date
```

**Exports:**
```typescript
// packages/core/src/index.ts
export { ComponentName } from './components/ComponentName';
export type { ComponentNameProps } from './components/ComponentName';
```

## Build Verification

After each phase, run:
```bash
bun run build           # Build all packages
bun run typecheck       # Type check
bun run lint            # Biome check
bun run size            # Bundle size check (<25kB)
```

## Implementation Flow

1. **Mark phase as in_progress** in your todo list
2. **Implement the phase** following Kaal patterns
3. **Run verification commands**
4. **Mark phase as completed**
5. **Update the plan file** with checkmarks
6. **Proceed to next phase**

## Pause Points

Pause for manual testing after:
- Component renders correctly (verify via Snack embed or local build)
- Animation implementations
- Platform-specific code changes

Ask user to test via Snack embed or local build before proceeding.
