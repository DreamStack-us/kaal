import type React from 'react';
import { ThemeOverrideProvider } from '../../context/ThemeOverrideContext';
import { CalendarGrid } from '../CalendarGrid';
import { WheelPicker } from '../WheelPicker';
import type { KaalDatePickerProps } from './DatePicker';

export const DatePicker: React.FC<KaalDatePickerProps> = ({
  value,
  onChange,
  theme = 'ios',
  variant = 'calendar',
  minDate,
  maxDate,
  disabledDates,
  themeOverrides,
  weekStartsOn = 0,
}) => {
  if (theme === 'ios' && variant === 'wheel') {
    return (
      <ThemeOverrideProvider value={{ datePicker: themeOverrides }}>
        <WheelPicker
          value={value}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
        />
      </ThemeOverrideProvider>
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
        themeMode={theme === 'native' ? 'ios' : theme}
        weekStartsOn={weekStartsOn}
      />
    </ThemeOverrideProvider>
  );
};
