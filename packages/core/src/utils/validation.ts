/**
 * Simple validation utilities for date/time pickers
 * No external dependencies - just inline checks
 */

// ISO date regex pattern
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ISO_DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?$/;

/**
 * Validates an ISO 8601 date string (YYYY-MM-DD)
 */
export function isValidISODate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) return false;

  const [year, month, day] = value.split('-').map(Number) as [number, number, number];
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/**
 * Validates an ISO 8601 datetime string
 */
export function isValidISODateTime(value: string): boolean {
  if (!ISO_DATETIME_PATTERN.test(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Validates a time value (24-hour format)
 */
export function isValidTime(hours: number, minutes: number): boolean {
  return (
    Number.isInteger(hours) &&
    Number.isInteger(minutes) &&
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59
  );
}

/**
 * Validates a date range where start <= end
 */
export function isValidDateRange(start: string, end: string): boolean {
  if (!isValidISODate(start) || !isValidISODate(end)) return false;
  return start <= end;
}

/**
 * Parses an ISO date string to a Date object
 * Returns null if invalid
 */
export function parseISODateSafe(value: string): Date | null {
  if (!isValidISODate(value)) return null;
  const [year, month, day] = value.split('-').map(Number) as [number, number, number];
  return new Date(Date.UTC(year, month - 1, day));
}

// Types for date picker values
export interface DatePickerValue {
  selectedDate: string;
  minDate?: string;
  maxDate?: string;
  disabledDates?: string[];
}

export interface DateRange {
  start: string;
  end: string;
}

// Legacy schema exports for backward compatibility
// These are now simple validation functions, not valibot schemas

/** @deprecated Use isValidISODate() instead */
export const isoDateSchema = {
  parse: (value: string) => {
    if (!isValidISODate(value)) throw new Error('Invalid ISO date');
    return value;
  },
};

/** @deprecated Use isValidISODateTime() instead */
export const isoDateTimeSchema = {
  parse: (value: string) => {
    if (!isValidISODateTime(value)) throw new Error('Invalid ISO datetime');
    return value;
  },
};

/** @deprecated Use isValidDateRange() instead */
export const dateRangeSchema = {
  parse: (value: DateRange) => {
    if (!isValidDateRange(value.start, value.end)) throw new Error('Invalid date range');
    return value;
  },
};

/** @deprecated Use DatePickerValue type instead */
export const datePickerValueSchema = {
  parse: (value: DatePickerValue) => value,
};

/** @deprecated Use parseISODateSafe() instead */
export const dateSchema = {
  parse: (value: string) => {
    const date = parseISODateSafe(value);
    if (!date) throw new Error('Invalid date');
    return date;
  },
};

/** @deprecated Alias for dateSchema */
export const temporalDateSchema = dateSchema;
