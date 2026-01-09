import type React from 'react';
import type { TimePickerProps } from '../../types/timepicker';

// Re-export types for convenience
export type { TimePickerProps, TimeValue } from '../../types/timepicker';

/**
 * TimePicker Component
 *
 * A cross-platform time picker with support for iOS wheel style and Material clock face.
 *
 * Platform-specific implementations are handled by Metro's file resolution:
 * - iOS: Uses @expo/ui DateTimePicker in time mode, falls back to TimeWheelPicker
 * - Android: Uses @expo/ui DateTimePicker or MaterialTimePicker with ClockFace
 * - Web: TimeWheelPicker for iOS theme, MaterialTimePicker for Android theme
 *
 * @example
 * ```tsx
 * import { TimePicker } from '@dreamstack-us/kaal';
 *
 * const [time, setTime] = useState({ hours: 9, minutes: 30 });
 *
 * <TimePicker
 *   value={time}
 *   onChange={setTime}
 *   theme="ios"
 *   is24Hour={false}
 * />
 * ```
 */
export const TimePicker: React.FC<TimePickerProps> = (_props) => {
  // This file serves as type definition and fallback
  // Metro resolves platform-specific files (.ios.tsx, .android.tsx, .web.tsx)
  return null;
};
