import React, { useCallback, Suspense } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Temporal } from '@js-temporal/polyfill';
import type { KaalDatePickerProps } from './DatePicker';
import { CalendarGrid } from '../CalendarGrid';
import { styles } from './DatePicker.styles';

const ExpoDatePicker = React.lazy(async () => {
  try {
    // @ts-expect-error - @expo/ui types not available
    const { DateTimePicker } = await import('@expo/ui/jetpack-compose');
    return {
      default: ({ value, onChange }: any) => (
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
    return { default: ({ value, onChange }: any) => null as any };
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
          ? Temporal.PlainDate.from(date.toISOString().split('T')[0]!)
          : date;
      onChange(plainDate);
    },
    [onChange]
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
