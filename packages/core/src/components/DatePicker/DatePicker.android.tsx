import React, { Suspense, useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ThemeOverrideProvider } from '../../context/ThemeOverrideContext';
import { toISODateString } from '../../utils/date';
import { CalendarGrid } from '../CalendarGrid';
import type { KaalDatePickerProps } from './DatePicker';
import { styles } from './DatePicker.styles';

interface ExpoDatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
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
          initialDate={toISODateString(value)}
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
  themeOverrides,
  weekStartsOn = 0,
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
          <ExpoDatePicker value={value} onChange={handleDateChange} />
        </Suspense>
      </View>
    );
  }

  return (
    <ThemeOverrideProvider value={{ datePicker: themeOverrides }}>
      <CalendarGrid
        value={value}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        themeMode={theme}
        weekStartsOn={weekStartsOn}
      />
    </ThemeOverrideProvider>
  );
};
