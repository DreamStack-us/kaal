import { useState, useMemo, useCallback } from 'react';
import { Temporal } from '@js-temporal/polyfill';

export const useCalendar = (initialDate?: Temporal.PlainDate) => {
  const [currentMonth, setCurrentMonth] = useState(() =>
    Temporal.PlainYearMonth.from(initialDate ?? Temporal.Now.plainDateISO())
  );

  const navigateMonth = useCallback((direction: 1 | -1) => {
    setCurrentMonth((prev) => prev.add({ months: direction }));
  }, []);

  const goToMonth = useCallback((yearMonth: Temporal.PlainYearMonth) => {
    setCurrentMonth(yearMonth);
  }, []);

  const goToDate = useCallback((date: Temporal.PlainDate) => {
    setCurrentMonth(Temporal.PlainYearMonth.from(date));
  }, []);

  const daysInMonth = useMemo(() => {
    const firstDay = currentMonth.toPlainDate({ day: 1 });
    const days: (Temporal.PlainDate | null)[] = [];
    const paddingDays = firstDay.dayOfWeek - 1;

    for (let i = 0; i < paddingDays; i++) {
      days.push(null);
    }

    for (let day = 1; day <= currentMonth.daysInMonth; day++) {
      days.push(currentMonth.toPlainDate({ day }));
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
