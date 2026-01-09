import type React from 'react';
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
}) => {
  // iOS theme uses wheel picker
  if (theme === 'ios') {
    return (
      <TimeWheelPicker
        value={value}
        onChange={onChange}
        is24Hour={is24Hour}
        minuteInterval={minuteInterval}
      />
    );
  }

  // Android/native theme uses Material clock face
  return (
    <MaterialTimePicker value={value} onChange={onChange} is24Hour={is24Hour} />
  );
};
