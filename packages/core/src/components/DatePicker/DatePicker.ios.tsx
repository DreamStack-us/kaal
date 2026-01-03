import React, { useCallback, Suspense } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Temporal } from '@js-temporal/polyfill';
import type { KaalDatePickerProps } from './DatePicker';
import { CalendarGrid } from '../CalendarGrid';
import { styles } from './DatePicker.styles';

const ExpoDatePicker = React.lazy(async () => {
  try {
    const { DateTimePicker, Host } = await import('@expo/ui/swift-ui');
    return {
      default: ({ value, onChange, variant }: any) => (
        <Host matchContents>
          <DateTimePicker
            onDateSelected={onChange}
            displayedComponents="date"
            initialDate={value.toString()}
            variant={variant || 'wheel'}
          />
        </Host>
      ),
    };
  } catch {
    return { default: () => null };
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
    (date: Date | Temporal.PlainDate) => {
      const plainDate =
        date instanceof Date
          ? Temporal.PlainDate.from(date.toISOString().split('T')[0])
          : date;
      onChange(plainDate);
    },
    [onChange]
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
