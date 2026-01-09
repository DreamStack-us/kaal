---
sidebar_position: 3
---

# Platform Differences

Kaal provides consistent APIs across platforms while respecting platform conventions.

## How It Works

Kaal uses Metro's platform-specific file resolution. When you import a component, Metro loads the appropriate file based on the platform:

```
DatePicker.tsx        # Fallback / type definitions
DatePicker.ios.tsx    # iOS implementation
DatePicker.android.tsx # Android implementation
DatePicker.web.tsx    # Web implementation
```

This happens automatically - you just import from `@dreamstack-us/kaal`.

## DatePicker

### Native Theme Behavior

When using `theme="native"`:

| Platform | Calendar Variant | Wheel Variant |
|----------|-----------------|---------------|
| iOS | CalendarGrid | UIDatePicker |
| Android | CalendarGrid | MaterialDatePicker |
| Web | CalendarGrid | WheelPicker |

### iOS Specifics

- Uses `@expo/ui` DateTimePicker when available
- Falls back to custom WheelPicker implementation
- Native haptic feedback on selection

### Android Specifics

- Uses `@expo/ui` DateTimePicker when available
- Material Design 3 styling
- Native date picker dialog support

### Web Specifics

- Pure JavaScript implementation
- CSS-based animations (no Reanimated dependency on web)
- Keyboard navigation support

## TimePicker

### Theme Options

| Theme | iOS | Android | Web |
|-------|-----|---------|-----|
| `native` | UIDatePicker (time mode) | MaterialTimePicker | TimeWheelPicker |
| `ios` | TimeWheelPicker | TimeWheelPicker | TimeWheelPicker |
| `android` | ClockFace | ClockFace | ClockFace |

### iOS Specifics

- `theme="native"` uses native UIDatePicker
- `theme="ios"` uses custom wheel implementation
- Native haptic feedback

### Android Specifics

- `theme="native"` uses Material time picker
- `theme="android"` uses custom ClockFace
- Touch ripple effects

### Web Specifics

- All themes use JavaScript implementations
- CSS transitions for smooth animations
- Mouse and touch support

## Handling Platform Differences

### Conditional Rendering

```tsx
import { Platform } from 'react-native';
import { DatePicker } from '@dreamstack-us/kaal';

function MyDatePicker() {
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      variant={Platform.select({
        ios: 'wheel',
        android: 'calendar',
        default: 'calendar',
      })}
    />
  );
}
```

### Platform-Specific Themes

```tsx
import { Platform } from 'react-native';
import { TimePicker } from '@dreamstack-us/kaal';

function MyTimePicker() {
  return (
    <TimePicker
      value={time}
      onChange={setTime}
      theme={Platform.select({
        ios: 'ios',
        android: 'android',
        default: 'ios',
      })}
    />
  );
}
```

## Gesture Handling

### iOS

- Swipe gestures on wheel pickers
- Native scroll physics
- Momentum and bounce

### Android

- Touch and drag on clock face
- Material ripple feedback
- Scroll fling support

### Web

- Mouse drag and click
- Touch events on mobile browsers
- Scroll wheel support on desktops

## Accessibility

Kaal includes platform-appropriate accessibility features:

### iOS

- VoiceOver support
- Accessibility labels and hints
- Rotor navigation

### Android

- TalkBack support
- Content descriptions
- Touch exploration

### Web

- ARIA labels and roles
- Keyboard navigation
- Screen reader announcements

## Performance Considerations

### iOS & Android

- Uses `react-native-reanimated` for 60fps animations
- Runs on UI thread for smooth gestures
- Minimal JavaScript bridge usage

### Web

- CSS animations for scroll effects
- No Reanimated dependency
- Optimized re-renders

## Testing Across Platforms

We recommend testing on all target platforms:

```bash
# iOS Simulator
npx react-native run-ios

# Android Emulator
npx react-native run-android

# Web Browser
npx expo start --web
```

## Known Limitations

### iOS

- Native picker may have different font than custom implementation

### Android

- Material time picker requires Android 5.0+
- Clock face needs SVG support

### Web

- No native OS date/time picker integration
- Touch events may vary across browsers
