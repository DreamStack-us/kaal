import { Temporal } from '@js-temporal/polyfill';
import { useCallback, useState } from 'react';

interface UseDatePickerOptions {
  initialDate?: Temporal.PlainDate;
  minDate?: Temporal.PlainDate;
  maxDate?: Temporal.PlainDate;
  onChange?: (date: Temporal.PlainDate) => void;
}

export const useDatePicker = (options: UseDatePickerOptions = {}) => {
  const {
    initialDate = Temporal.Now.plainDateISO(),
    minDate,
    maxDate,
    onChange,
  } = options;

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleDateChange = useCallback(
    (date: Temporal.PlainDate) => {
      setSelectedDate(date);
      onChange?.(date);
    },
    [onChange],
  );

  const isDateDisabled = useCallback(
    (date: Temporal.PlainDate) => {
      if (minDate && Temporal.PlainDate.compare(date, minDate) < 0) return true;
      if (maxDate && Temporal.PlainDate.compare(date, maxDate) > 0) return true;
      return false;
    },
    [minDate, maxDate],
  );

  return {
    selectedDate,
    setSelectedDate: handleDateChange,
    isDateDisabled,
    minDate,
    maxDate,
  };
};
