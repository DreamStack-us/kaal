import type React from 'react';
import { ThemeOverrideProvider } from '../../context/ThemeOverrideContext';
import { CalendarGrid } from '../CalendarGrid';
import { WheelPicker } from '../WheelPicker';
import type { KaalDatePickerProps } from './DatePicker';

export const DatePicker: React.FC<KaalDatePickerProps> = (props) => {
  const {
    theme = 'ios',
    variant = 'calendar',
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

  // Single selection mode (default)
  // Wheel picker only supports single selection
  if (theme === 'ios' && variant === 'wheel') {
    return (
      <ThemeOverrideProvider value={{ datePicker: themeOverrides }}>
        <WheelPicker
          value={props.value}
          onChange={props.onChange}
          minDate={minDate}
          maxDate={maxDate}
        />
      </ThemeOverrideProvider>
    );
  }

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
