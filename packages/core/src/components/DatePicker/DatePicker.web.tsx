import type React from 'react';
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
}) => {
  if (theme === 'ios' && variant === 'wheel') {
    return (
      <WheelPicker
        value={value}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  }

  return (
    <CalendarGrid
      value={value}
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
      disabledDates={disabledDates}
      themeMode={theme === 'native' ? 'ios' : theme}
    />
  );
};
