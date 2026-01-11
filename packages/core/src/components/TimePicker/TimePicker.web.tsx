import type React from 'react';
import { ThemeOverrideProvider } from '../../context/ThemeOverrideContext';
import type { TimePickerProps } from '../../types/timepicker';
import { MaterialTimePicker } from './MaterialTimePicker';
import { TimeWheelPicker } from './TimeWheelPicker';

/**
 * Web implementation of TimePicker
 *
 * - theme="ios": Uses TimeWheelPicker (iOS-style wheel)
 * - theme="android" or "native": Uses MaterialTimePicker (Material clock face)
 */
export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  theme = 'ios',
  is24Hour = false,
  minuteInterval = 1,
  themeOverrides,
}) => {
  // iOS theme uses wheel picker
  if (theme === 'ios') {
    return (
      <ThemeOverrideProvider value={{ timePicker: themeOverrides }}>
        <TimeWheelPicker
          value={value}
          onChange={onChange}
          is24Hour={is24Hour}
          minuteInterval={minuteInterval}
        />
      </ThemeOverrideProvider>
    );
  }

  // Android/native theme uses Material clock face
  return (
    <ThemeOverrideProvider value={{ timePicker: themeOverrides }}>
      <MaterialTimePicker value={value} onChange={onChange} is24Hour={is24Hour} />
    </ThemeOverrideProvider>
  );
};
