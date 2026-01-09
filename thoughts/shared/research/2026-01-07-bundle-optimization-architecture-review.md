---
date: 2026-01-07
researcher: claude
git_commit: 406e426
branch: feature/oss-prep
repository: kaal
topic: Bundle Optimization & AI-Friendly Architecture Review
tags: [bundle-size, valibot, temporal, reanimated, compound-components, cli, timepicker]
status: complete
---

# Bundle Optimization & AI-Friendly Architecture Review

## Summary

Kaal's core library is already remarkably small at **3.25KB** (minified + brotli), well under the 8KB target. However, the peer dependencies (Temporal polyfill ~14-52KB, Zod ~10-15KB, Reanimated ~50KB) create significant bundle overhead for consumers. This research documents the current state and opportunities for optimization toward the DreamStack UI vision.

---

## Current State Analysis

### Bundle Size (Core Library Only)

```
Size limit: 25 kB
Size:       3.25 kB with all dependencies, minified and brotlied
```

**Note:** This measures only the core library code, NOT peer dependencies which users must install.

### Peer Dependencies Analysis

| Dependency | Estimated Size | Current Usage | Optimization Potential |
|------------|---------------|---------------|----------------------|
| `@js-temporal/polyfill` | 14-52 KB | Date handling throughout | **HIGH** - Replace with native Date/Intl |
| `zod` | 10-15 KB | `validation.ts` schemas | **HIGH** - Replace with Valibot (~1.5KB) |
| `react-native-reanimated` | ~50 KB | WheelPicker animations | **MEDIUM** - CSS-only for web |
| `react-native-gesture-handler` | ~20 KB | WheelPicker pan gestures | Keep (needed for touch) |
| `react-native-unistyles` | ~15 KB | Theming | Keep (core to design) |

**Total peer dependency overhead: ~110-150KB** (before tree-shaking)

---

## Detailed Findings

### 1. Temporal API Usage

**Location:** `packages/core/src/utils/temporal.ts`

```typescript
import { Temporal } from '@js-temporal/polyfill';

export const fromISODateString = (iso: string): Temporal.PlainDate => {
  return Temporal.PlainDate.from(iso);
};

export const getDateRange = (
  start: Temporal.PlainDate,
  end: Temporal.PlainDate,
): Temporal.PlainDate[] => {
  // Uses Temporal.PlainDate.compare and .add()
};
```

**Problem:** Temporal API has 0% browser support as of Jan 2026 - the polyfill is mandatory and heavy.

**Opportunity:** Replace with native `Date` + `Intl.DateTimeFormat`:

```typescript
// Native alternative (~2KB vs 14-52KB)
export function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  const dayOfMonth = d.getDate();
  d.setDate(1); // Avoid overflow during month change
  d.setMonth(d.getMonth() + months);
  const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(dayOfMonth, daysInMonth));
  return d;
}
```

### 2. Zod Validation Usage

**Location:** `packages/core/src/utils/validation.ts`

```typescript
import { z } from 'zod';

export const isoDateSchema = z
  .string()
  .date()
  .refine((val) => {
    try {
      Temporal.PlainDate.from(val);
      return true;
    } catch {
      return false;
    }
  });
```

**Problem:** Full Zod import adds 10-15KB. Validation is optional for most use cases.

**Opportunity:** Switch to Valibot (~1.5KB) or hand-roll (~300 bytes):

```typescript
// Valibot alternative
import * as v from 'valibot';

const DateRangeSchema = v.pipe(
  v.date(),
  v.minValue(new Date('2024-01-01')),
  v.maxValue(new Date('2025-12-31'))
);
```

### 3. Animation Patterns

**Location:** `packages/core/src/components/WheelPicker/WheelPicker.web.tsx`

```typescript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const panGesture = useMemo(() =>
  Gesture.Pan()
    .onUpdate((e) => {
      'worklet';
      translateY.value = e.translationY + -selectedIndex * ITEM_HEIGHT;
    })
    .onEnd(() => {
      'worklet';
      translateY.value = withSpring(-clampedIndex * ITEM_HEIGHT, {
        damping: 20,
        stiffness: 200,
      });
    }),
  [selectedIndex, items.length]
);
```

**Problem:** On web, Reanimated runs entirely on the JS thread - the worklet optimization doesn't apply.

**Opportunity:** CSS-first for web, Reanimated for native:

```css
/* Web alternative - 0 bytes */
.day-cell {
  transition: transform 100ms ease-out, background 100ms;
}
.day-cell:hover { background: var(--day-hover); }
.day-cell:active { transform: scale(0.95); }
```

### 4. Component Architecture (AI-Friendliness)

**Current Pattern:** Monolithic props interface

```typescript
// Current: Not compound components
<DatePicker
  value={date}
  onChange={setDate}
  mode="date"
  theme="native"
  variant="wheel"
  minDate={minDate}
  maxDate={maxDate}
  disabledDates={[]}
/>
```

**AI-Friendly Alternative:** Compound components with semantic slots

```typescript
// Target: Compound pattern
<Kaal.Root value={date} onValueChange={setDate}>
  <Kaal.Calendar>
    <Kaal.Header>
      <Kaal.PrevMonth />
      <Kaal.MonthTitle />
      <Kaal.NextMonth />
    </Kaal.Header>
    <Kaal.Grid>
      {(date) => <Kaal.Day date={date} />}
    </Kaal.Grid>
  </Kaal.Calendar>
</Kaal.Root>
```

**Benefits for AI:**
- Flat, predictable prop interfaces
- Semantic slot names (header, trigger, content)
- Consistent patterns across components
- Self-documenting JSX structure

### 5. Theme System (CLI Integration Potential)

**Current Structure:** `packages/themes/src/themes/light.ts`

```typescript
export const lightTheme = {
  colors: {
    background: { default, elevated, subtle },
    foreground: { default, muted, subtle },
    primary: { default, hover, pressed },
    datepicker: {
      cellBackground,
      cellSelected,
      cellToday,
      textDefault,
      textSelected,
      textDisabled,
      textWeekend,
    },
  },
  spacing: (multiplier: number) => multiplier * 4,
  radii: { cell, card, button },
  typography: { dayCell, dayHeader, monthHeader },
};
```

**CLI Opportunity:** The semantic token structure is already AI-friendly:

```bash
# Proposed @kaal/cli commands
npx @kaal/cli init --from-unistyles ./src/unistyles.ts
npx @kaal/cli init --from-tailwind ./tailwind.config.js
npx @kaal/cli sync-figma ./figma-tokens.json
npx @kaal/cli validate
```

The current `datepicker.*` tokens map cleanly to semantic slots:
- `cellBackground` → `surface`
- `cellSelected` → `selected`
- `textDefault` → `text`

### 6. TimePicker Implementation Gaps

**Current State:** Only WheelPicker exists (iOS-style wheel)

**Missing:**
1. **M3 Clock Picker** - Material Design 3 uses a clock-face dial, not wheel
2. **Direct Input Mode** - Keyboard entry for exact time values
3. **Keyboard Navigation** - Arrow keys, Page Up/Down

**Reference:** https://m3.material.io/components/time-pickers/overview

**Required Components:**

```
packages/kaal-timepicker/
├── src/
│   ├── primitives/
│   │   ├── WheelColumn.tsx      # Existing wheel pattern
│   │   ├── ClockFace.tsx        # M3 analog clock dial (NEW)
│   │   └── TimeInput.tsx        # Direct keyboard entry (NEW)
│   ├── variants/
│   │   ├── IOSTimePicker.tsx    # Wheel style
│   │   ├── MaterialTimePicker.tsx # Clock dial + input toggle
│   │   └── CompactTimePicker.tsx  # Input-first mode
```

---

## Optimization Recommendations

### Phase 1: Immediate Wins

| Change | Bundle Impact | Effort |
|--------|--------------|--------|
| Replace Zod with Valibot | -8 to -13 KB | Low |
| Make validation optional export | -1.5 KB (when unused) | Low |
| Add `"sideEffects": false` to package.json | Better tree-shaking | Trivial |

### Phase 2: Major Refactors

| Change | Bundle Impact | Effort |
|--------|--------------|--------|
| Replace Temporal with native Date/Intl | -14 to -52 KB | High |
| CSS-only animations for web | -50 KB (web only) | Medium |
| Compound component architecture | Neutral | High |

### Phase 3: CLI & Tooling

| Feature | Value |
|---------|-------|
| `@kaal/cli init` | Parse existing design systems |
| `@kaal/cli sync-figma` | Import Figma Tokens |
| `@kaal/cli validate` | AI-verifiable theme correctness |

---

## Competitive Positioning

| Library | Size (gzip) | Kaal Target |
|---------|------------|-------------|
| react-dates | 50-80 KB | - |
| react-datepicker | 48 KB | - |
| react-day-picker v9 | 22 KB | - |
| React Aria datepicker | 8 KB | Match |
| **Kaal (optimized)** | **<8 KB** | Target |

With the recommended optimizations, Kaal can achieve:
- **Core library:** <5 KB (already at 3.25 KB)
- **With native Date utilities:** <8 KB total
- **Peer dependency reduction:** -50-100 KB for consumers

---

## Files Analyzed

| File | Key Findings |
|------|-------------|
| `packages/core/package.json:32-41` | Peer deps: Temporal, Zod, Reanimated, Gesture Handler |
| `packages/core/src/utils/temporal.ts:1-54` | Heavy Temporal polyfill usage |
| `packages/core/src/utils/validation.ts:1-51` | Zod schemas for date validation |
| `packages/core/src/components/WheelPicker/WheelPicker.web.tsx:1-213` | Reanimated on web |
| `packages/core/src/components/CalendarGrid/CalendarGrid.tsx:1-148` | FlatList with proper optimization |
| `packages/core/src/components/CalendarGrid/DayCell.tsx:1-109` | React.memo with primitive props |
| `packages/themes/src/themes/light.ts:1-58` | Semantic token structure |

---

## Next Steps

1. Create `packages/kaal-cli` with theme detection and generation
2. Plan Zod → Valibot migration
3. Design compound component API for v2
4. Prototype M3 ClockFace component for TimePicker
5. Research native Date utilities to replace Temporal
