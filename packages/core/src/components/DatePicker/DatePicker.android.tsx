import { Temporal } from '@js-temporal/polyfill';
import React, { useCallback, Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { CalendarGrid } from '../CalendarGrid';
import type { KaalDatePickerProps } from './DatePicker';
import { styles } from './DatePicker.styles';

interface ExpoDatePickerProps {
  value: Temporal.PlainDate;
  onChange: (date: Date | Temporal.PlainDate) => void;
}

// @ts-expect-error - React.lazy fallback returns null when @expo/ui unavailable
const ExpoDatePicker = React.lazy(async () => {
  try {
    // @ts-expect-error - @expo/ui types not available
    const { DateTimePicker } = await import('@expo/ui/jetpack-compose');
    return {
      default: ({ value, onChange }: ExpoDatePickerProps) => (
        <DateTimePicker
          onDateSelected={onChange}
          displayedComponents="date"
          initialDate={value.toString()}
          variant="picker"
        />
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
  theme = 'native',
  minDate,
  maxDate,
  disabledDates,
}) => {
  const handleDateChange = useCallback(
    (date: Date | Temporal.PlainDate) => {
      const plainDate =
        date instanceof Date
          ? Temporal.PlainDate.from(date.toISOString().split('T')[0] ?? '')
          : date;
      onChange(plainDate);
    },
    [onChange],
  );

  if (theme === 'native') {
    return (
      <View style={styles.container}>
        <Suspense fallback={<ActivityIndicator />}>
          <ExpoDatePicker value={value} onChange={handleDateChange} />
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
