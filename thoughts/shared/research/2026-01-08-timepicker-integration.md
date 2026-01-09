---
date: 2026-01-08
researcher: claude
git_commit: dd2a2f7
branch: feature/oss-prep
repository: kaal
topic: TimePicker Component Integration
tags: [timepicker, ios, android, material-design, wheel-picker, clock-face]
status: complete
---

# TimePicker Component Integration

## Summary

Integrated a cross-platform TimePicker component into the Kaal library based on an HTML demo prototype. The implementation includes iOS-style wheel picker and Material Design 3 clock face variants, with platform-specific routing for iOS, Android, and React Native Web.

## Findings

### HTML Demo Analysis

The HTML demo (`kaal-timepicker-demo_4.html`) contained two TimePicker variants:

**iOS Wheel Picker:**
- CSS scroll-snap based wheels for hours (1-12), minutes (0-59), AM/PM
- Gradient fade effects at top/bottom with `linear-gradient`
- Selection indicator bar (44px height) in center
- Smooth scroll behavior with `scroll-snap-type: y mandatory`

**Material Clock Picker:**
- SVG-based clock face (256x256 viewBox)
- Two modes: hour selection (12 positions) and minute selection (60 positions)
- Clock hand and selection dot following angle calculations
- AM/PM toggle buttons with Material styling
- Touch/mouse drag interaction with angle-to-value conversion

### Architecture Decisions

1. **Platform-specific files**: Followed existing DatePicker pattern with `.ios.tsx`, `.android.tsx`, `.web.tsx`
2. **Native fallback**: Uses `@expo/ui` DateTimePicker when available, custom implementation otherwise
3. **Reanimated for gestures**: Leveraged existing gesture-handler + reanimated for wheel interactions
4. **react-native-svg**: Added as peer dependency for ClockFace SVG rendering

### Components Created

| Component | Location | Purpose |
|-----------|----------|---------|
| TimeWheelPicker | `components/TimePicker/TimeWheelPicker.tsx` | iOS-style wheel (3 columns) |
| ClockFace | `components/TimePicker/ClockFace.tsx` | Material SVG clock dial |
| MaterialTimePicker | `components/TimePicker/MaterialTimePicker.tsx` | Full Material picker layout |
| TimePicker | `components/TimePicker/TimePicker.{ios,android,web}.tsx` | Platform routing |

### Type System

```typescript:packages/core/src/types/timepicker.ts
export interface TimeValue {
  hours: number;   // 0-23 (24-hour internal format)
  minutes: number; // 0-59
}

export interface TimePickerProps {
  value: TimeValue;
  onChange: (time: TimeValue) => void;
  theme?: 'native' | 'ios' | 'android';
  minuteInterval?: 1 | 5 | 10 | 15 | 30;
  is24Hour?: boolean;
}
```

### Key Implementation Details

**Angle Calculations (ClockFace):**
```typescript
// 12 o'clock at -90 degrees (top of circle)
const positionToAngle = (position: number, isMinutes = false): number => {
  if (isMinutes) {
    return (position * 6) - 90; // 360/60 = 6 degrees per minute
  }
  return (position * 30) - 90; // 360/12 = 30 degrees per position
};
```

**12/24 Hour Conversion (useTimePicker hook):**
```typescript
export const to12Hour = (hours: number): Time12Hour => {
  const period: TimePeriod = hours >= 12 ? 'PM' : 'AM';
  let hour = hours % 12;
  if (hour === 0) hour = 12;
  return { hour, period };
};

export const to24Hour = (hour: number, period: TimePeriod): number => {
  if (period === 'AM') return hour === 12 ? 0 : hour;
  return hour === 12 ? 12 : hour + 12;
};
```

## Code Examples

### Using TimePicker

```tsx
import { TimePicker, type TimeValue } from '@dreamstack-us/kaal';

const [time, setTime] = useState<TimeValue>({ hours: 9, minutes: 30 });

// iOS wheel style
<TimePicker value={time} onChange={setTime} theme="ios" />

// Material clock style
<TimePicker value={time} onChange={setTime} theme="android" />
```

### Using useTimePicker hook

```tsx
import { useTimePicker } from '@dreamstack-us/kaal';

const {
  hours,
  minutes,
  hour12,      // 1-12 format
  period,      // 'AM' | 'PM'
  setHours,
  setMinutes,
  setPeriod,
  formatted,   // "9:30 AM"
} = useTimePicker({ initialHours: 9, initialMinutes: 30 });
```

## Files Modified/Created

| File | Action |
|------|--------|
| `packages/core/src/types/timepicker.ts` | Created |
| `packages/core/src/types/index.ts` | Modified (export timepicker) |
| `packages/core/src/hooks/useTimePicker.ts` | Created |
| `packages/core/src/hooks/index.ts` | Modified (export useTimePicker) |
| `packages/core/src/components/TimePicker/` | Created directory + 8 files |
| `packages/core/src/components/index.ts` | Modified (export TimePicker) |
| `packages/core/src/index.ts` | Modified (export all TimePicker) |
| `packages/core/package.json` | Modified (add react-native-svg) |
| `packages/themes/src/tokens/component.ts` | Modified (add timepicker tokens) |
| `packages/themes/src/themes/light.ts` | Modified (add timepicker colors) |
| `packages/themes/src/themes/dark.ts` | Modified (add timepicker colors) |
| `apps/expo-example/app/index.tsx` | Modified (demo both pickers) |

## Next Steps

1. Add 24-hour inner ring support to ClockFace for `is24Hour` mode
2. Implement keyboard input mode for Material picker
3. Add haptic feedback on iOS
4. Add accessibility labels and roles
5. Consider animated transitions for mode switching in ClockFace
