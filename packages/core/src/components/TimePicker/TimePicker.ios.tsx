import React, { Suspense, useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ThemeOverrideProvider } from '../../context/ThemeOverrideContext';
import type { TimePickerProps, TimeValue } from '../../types/timepicker';
import { styles } from './TimePicker.styles';
import { TimeWheelPicker } from './TimeWheelPicker';

interface ExpoTimePickerProps {
  value: TimeValue;
  onChange: (time: TimeValue) => void;
  is24Hour?: boolean;
}

// @ts-expect-error - React.lazy fallback returns null when @expo/ui unavailable
const ExpoTimePicker = React.lazy(async () => {
  try {
    // @ts-expect-error - @expo/ui types not available
    const { DateTimePicker, Host } = await import('@expo/ui/swift-ui');

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
          <Host matchContents>
            <DateTimePicker
              onDateSelected={handleChange}
              displayedComponents="hourAndMinute"
              initialDate={date.toISOString()}
              variant="wheel"
            />
          </Host>
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
  minuteInterval = 1,
  themeOverrides,
}) => {
  const handleTimeChange = useCallback(
    (time: TimeValue) => {
      onChange(time);
    },
    [onChange],
  );

  // Use native iOS picker for 'native' or 'ios' theme
  if (theme === 'native' || theme === 'ios') {
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

  // Fallback to wheel picker for other themes
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
};
