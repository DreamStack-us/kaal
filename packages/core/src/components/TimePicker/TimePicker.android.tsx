import React, { Suspense, useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import type { TimePickerProps, TimeValue } from '../../types/timepicker';
import { MaterialTimePicker } from './MaterialTimePicker';
import { styles } from './TimePicker.styles';

interface ExpoTimePickerProps {
  value: TimeValue;
  onChange: (time: TimeValue) => void;
  is24Hour?: boolean;
}

// @ts-expect-error - React.lazy fallback returns null when @expo/ui unavailable
const ExpoTimePicker = React.lazy(async () => {
  try {
    // @ts-expect-error - @expo/ui types not available
    const { DateTimePicker } = await import('@expo/ui/jetpack-compose');

    return {
      default: ({ value, onChange, is24Hour }: ExpoTimePickerProps) => {
        // Create a Date object for the picker
        const date = new Date();
        date.setHours(value.hours, value.minutes, 0, 0);

        const handleChange = (newDate: Date) => {
          onChange({
            hours: newDate.getHours(),
            minutes: newDate.getMinutes(),
          });
        };

        return (
          <DateTimePicker
            onDateSelected={handleChange}
            displayedComponents="hourAndMinute"
            initialDate={date.toISOString()}
            variant="picker"
          />
        );
      },
    };
  } catch {
    // Fallback when @expo/ui is not available
    return { default: (_props: ExpoTimePickerProps) => null };
  }
});

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  theme = 'native',
  is24Hour = false,
}) => {
  const handleTimeChange = useCallback(
    (time: TimeValue) => {
      onChange(time);
    },
    [onChange],
  );

  // Use native Android picker for 'native' theme
  if (theme === 'native') {
    return (
      <View style={styles.container}>
        <Suspense fallback={<ActivityIndicator />}>
          <ExpoTimePicker
            value={value}
            onChange={handleTimeChange}
            is24Hour={is24Hour}
          />
        </Suspense>
      </View>
    );
  }

  // Use Material-style picker for 'android' or 'ios' themes
  return (
    <MaterialTimePicker value={value} onChange={onChange} is24Hour={is24Hour} />
  );
};
