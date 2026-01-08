/**
 * Date utilities using native Date and Intl APIs
 * Replaces @js-temporal/polyfill for lighter bundle size
 */

/**
 * Converts a Date to ISO date string (YYYY-MM-DD)
 */
export const toISODateString = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
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
 * Parses an ISO date string (YYYY-MM-DD) to Date
 */
export const parseISODate = (iso: string): Date => {
  const parts = iso.split('-').map(Number) as [number, number, number];
  return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
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
    current.setUTCDate(current.getUTCDate() + 1);
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
  result.setUTCDate(result.getUTCDate() + days);
  return result;
};

/**
 * Adds months to a date, handling month overflow
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date.getTime());
  const dayOfMonth = result.getUTCDate();
  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);
  const daysInMonth = new Date(
    Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0),
  ).getUTCDate();
  result.setUTCDate(Math.min(dayOfMonth, daysInMonth));
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
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth()
  );
};

/**
 * Gets all days in a month
 */
export const getMonthDays = (year: number, month: number): Date[] => {
  const days: Date[] = [];
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(Date.UTC(year, month, day)));
  }
  return days;
};

/**
 * Gets the first day of the month
 */
export const getFirstDayOfMonth = (date: Date): Date => {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
};

/**
 * Gets the last day of the month
 */
export const getLastDayOfMonth = (date: Date): Date => {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));
};

/**
 * Gets the day of week (0 = Sunday, 6 = Saturday)
 */
export const getDayOfWeek = (date: Date): number => {
  return date.getUTCDay();
};

/**
 * Formats a month name
 */
export const formatMonth = (
  date: Date,
  locale = 'en-US',
  style: 'long' | 'short' | 'narrow' = 'long',
): string => {
  return new Intl.DateTimeFormat(locale, { month: style }).format(date);
};

/**
 * Formats a weekday name
 */
export const formatWeekday = (
  date: Date,
  locale = 'en-US',
  style: 'long' | 'short' | 'narrow' = 'short',
): string => {
  return new Intl.DateTimeFormat(locale, { weekday: style }).format(date);
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
 * Gets today's date at midnight UTC
 */
export const today = (): Date => {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
};
