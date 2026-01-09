import { useCallback, useState } from 'react';
import { compareDates, today } from '../utils/date';

interface UseDatePickerOptions {
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (date: Date) => void;
}

export const useDatePicker = (options: UseDatePickerOptions = {}) => {
  const { initialDate = today(), minDate, maxDate, onChange } = options;

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleDateChange = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      onChange?.(date);
    },
    [onChange],
  );

  const isDateDisabled = useCallback(
    (date: Date) => {
      if (minDate && compareDates(date, minDate) < 0) return true;
      if (maxDate && compareDates(date, maxDate) > 0) return true;
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
