/**
 * Date utilities using native Date and Intl APIs
 * Replaces @js-temporal/polyfill for lighter bundle size
 *
 * All date-only values use LOCAL time (not UTC). This ensures that
 * dates displayed in the calendar match what consumers read with
 * standard .getDate(), .getMonth(), .getFullYear() methods.
 */

/**
 * Converts a Date to ISO date string (YYYY-MM-DD) using local time
 */
export const toISODateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Converts a Date to ISO datetime string with timezone
 */
export const toISODateTimeString = (date: Date, timeZone?: string): string => {
  const tz = timeZone ?? getUserTimezone();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`;
};

/**
 * Parses an ISO date string (YYYY-MM-DD) to a local Date
 */
export const parseISODate = (iso: string): Date => {
  const parts = iso.split('-').map(Number) as [number, number, number];
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

/**
 * @deprecated Alias for parseISODate for backward compatibility
 */
export const fromISODateString = parseISODate;

/**
 * Parses an ISO datetime string to Date
 */
export const parseISODateTime = (iso: string): Date => {
  return new Date(iso);
};

/**
 * @deprecated Alias for parseISODateTime for backward compatibility
 */
export const fromISODateTimeString = parseISODateTime;

/**
 * Gets all dates in a range (inclusive)
 */
export const getDateRange = (start: Date, end: Date): Date[] => {
  const dates: Date[] = [];
  const current = new Date(start.getTime());

  while (current.getTime() <= end.getTime()) {
    dates.push(new Date(current.getTime()));
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

/**
 * Checks if a date is within the given range
 */
export const isDateInRange = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
): boolean => {
  const time = date.getTime();
  if (minDate && time < minDate.getTime()) return false;
  if (maxDate && time > maxDate.getTime()) return false;
  return true;
};

/**
 * Gets the user's timezone
 */
export const getUserTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Adds days to a date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Adds months to a date, handling month overflow
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date.getTime());
  const dayOfMonth = result.getDate();
  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  const daysInMonth = new Date(
    result.getFullYear(),
    result.getMonth() + 1,
    0,
  ).getDate();
  result.setDate(Math.min(dayOfMonth, daysInMonth));
  return result;
};

/**
 * Compares two dates
 * @returns negative if a < b, positive if a > b, 0 if equal
 */
export const compareDates = (a: Date, b: Date): number => {
  return a.getTime() - b.getTime();
};

/**
 * Checks if two dates are the same day
 */
export const isSameDay = (a: Date, b: Date): boolean => {
  return toISODateString(a) === toISODateString(b);
};

/**
 * Checks if two dates are the same month
 */
export const isSameMonth = (a: Date, b: Date): boolean => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
};

/**
 * Gets all days in a month
 */
export const getMonthDays = (year: number, month: number): Date[] => {
  const days: Date[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  return days;
};

/**
 * Gets the first day of the month
 * Falls back to today if date is undefined/null
 */
export const getFirstDayOfMonth = (date: Date | null | undefined): Date => {
  const d = date ?? today();
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

/**
 * Gets the last day of the month
 */
export const getLastDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Gets the day of week (0 = Sunday, 6 = Saturday)
 */
export const getDayOfWeek = (date: Date): number => {
  return date.getDay();
};

/**
 * Formats a month name
 */
export const formatMonth = (
  date: Date,
  locale = 'en-US',
  style: 'long' | 'short' | 'narrow' = 'long',
): string => {
  return new Intl.DateTimeFormat(locale, {
    month: style,
  }).format(date);
};

/**
 * Formats a weekday name
 */
export const formatWeekday = (
  date: Date,
  locale = 'en-US',
  style: 'long' | 'short' | 'narrow' = 'short',
): string => {
  return new Intl.DateTimeFormat(locale, {
    weekday: style,
  }).format(date);
};

/**
 * Formats year and month
 */
export const formatYearMonth = (date: Date, locale = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

/**
 * Gets today's date at local midnight
 */
export const today = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};
