import React from 'react';
import { View } from 'react-native';
import type { Temporal } from '@js-temporal/polyfill';
import type { KaalDatePickerProps } from './DatePicker';
import { CalendarGrid } from '../CalendarGrid';
import { WheelPicker } from '../WheelPicker';
import { styles } from './DatePicker.styles';

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
