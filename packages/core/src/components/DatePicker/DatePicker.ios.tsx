import React, { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ThemeOverrideProvider } from '../../context/ThemeOverrideContext';
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

export const DatePicker: React.FC<KaalDatePickerProps> = (props) => {
  const {
    mode = 'date',
    theme = 'native',
    variant = 'wheel',
    minDate,
    maxDate,
    disabledDates,
    themeOverrides,
    weekStartsOn = 0,
  } = props;

  const themeMode = theme === 'native' ? 'ios' : theme;

  // Range mode
  if (props.selectionMode === 'range') {
    return (
      <ThemeOverrideProvider value={{ datePicker: themeOverrides }}>
        <CalendarGrid
          selectionMode="range"
          startDate={props.startDate}
          endDate={props.endDate}
          onRangeChange={props.onRangeChange}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          themeMode={themeMode}
          weekStartsOn={weekStartsOn}
        />
      </ThemeOverrideProvider>
    );
  }

  // Single selection mode
  // Native picker only available for single selection
  if (theme === 'native') {
    return (
      <View style={styles.container}>
        <Suspense fallback={<ActivityIndicator />}>
          <ExpoDatePicker
            value={props.value}
            onChange={props.onChange}
            variant={variant}
          />
        </Suspense>
      </View>
    );
  }

  // Single selection with custom theme
  return (
    <ThemeOverrideProvider value={{ datePicker: themeOverrides }}>
      <CalendarGrid
        selectionMode="single"
        value={props.value}
        onChange={props.onChange}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        themeMode={themeMode}
        weekStartsOn={weekStartsOn}
      />
    </ThemeOverrideProvider>
  );
};
