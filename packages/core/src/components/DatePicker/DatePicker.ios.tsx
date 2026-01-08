import React, { Suspense, useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { toISODateString } from '../../utils/date';
import { CalendarGrid } from '../CalendarGrid';
import type { KaalDatePickerProps } from './DatePicker';
import { styles } from './DatePicker.styles';

interface ExpoDatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  variant?: string;
}

// @ts-expect-error - React.lazy fallback returns null when @expo/ui unavailable
const ExpoDatePicker = React.lazy(async () => {
  try {
    // @ts-expect-error - @expo/ui types not available
    const { DateTimePicker, Host } = await import('@expo/ui/swift-ui');
    return {
      default: ({ value, onChange, variant }: ExpoDatePickerProps) => (
        <Host matchContents>
          <DateTimePicker
            onDateSelected={onChange}
            displayedComponents="date"
            initialDate={toISODateString(value)}
            variant={variant || 'wheel'}
          />
        </Host>
      ),
    };
  } catch {
    // Fallback when @expo/ui is not available
    return { default: (_props: ExpoDatePickerProps) => null };
  }
});

export const DatePicker: React.FC<KaalDatePickerProps> = ({
  value,
  onChange,
  mode = 'date',
  theme = 'native',
  variant = 'wheel',
  minDate,
  maxDate,
  disabledDates,
}) => {
  const handleDateChange = useCallback(
    (date: Date) => {
      onChange(date);
    },
    [onChange],
  );

  if (theme === 'native') {
    return (
      <View style={styles.container}>
        <Suspense fallback={<ActivityIndicator />}>
          <ExpoDatePicker
            value={value}
            onChange={handleDateChange}
            variant={variant}
          />
        </Suspense>
      </View>
    );
  }

  return (
    <CalendarGrid
      value={value}
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
      disabledDates={disabledDates}
      themeMode={theme}
    />
  );
};
