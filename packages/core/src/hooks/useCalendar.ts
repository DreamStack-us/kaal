import { useCallback, useMemo, useState } from 'react';
import {
  addMonths,
  getDayOfWeek,
  getFirstDayOfMonth,
  getMonthDays,
  today,
} from '../utils/date';

export const useCalendar = (initialDate?: Date) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = initialDate ?? today();
    return getFirstDayOfMonth(date);
  });

  const navigateMonth = useCallback((direction: 1 | -1) => {
    setCurrentMonth((prev) => addMonths(prev, direction));
  }, []);

  const goToMonth = useCallback((date: Date) => {
    setCurrentMonth(getFirstDayOfMonth(date));
  }, []);

  const goToDate = useCallback((date: Date) => {
    setCurrentMonth(getFirstDayOfMonth(date));
  }, []);

  const daysInMonth = useMemo(() => {
    const days: (Date | null)[] = [];
    const firstDay = getFirstDayOfMonth(currentMonth);
    // getDayOfWeek returns 0 for Sunday, we want Monday = 0
    const dayOfWeek = getDayOfWeek(firstDay);
    const paddingDays = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    for (let i = 0; i < paddingDays; i++) {
      days.push(null);
    }

    const monthDays = getMonthDays(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
    );
    for (const day of monthDays) {
      days.push(day);
    }

    return days;
  }, [currentMonth]);

  return {
    currentMonth,
    daysInMonth,
    navigateMonth,
    goToMonth,
    goToDate,
    nextMonth: () => navigateMonth(1),
    prevMonth: () => navigateMonth(-1),
  };
};
