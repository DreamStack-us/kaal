import * as v from 'valibot';

/**
 * Helper to parse ISO date string parts
 * Assumes input is already validated by regex pattern
 */
const parseISOParts = (val: string): [number, number, number] => {
  const parts = val.split('-').map(Number) as [number, number, number];
  return parts;
};

/**
 * Validates an ISO 8601 date string (YYYY-MM-DD)
 */
export const isoDateSchema = v.pipe(
  v.string(),
  v.regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format'),
  v.check((val) => {
    const [year, month, day] = parseISOParts(val);
    const date = new Date(Date.UTC(year, month - 1, day));
    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, 'Invalid ISO 8601 date format'),
);

/**
 * Validates an ISO 8601 datetime string with timezone offset
 */
export const isoDateTimeSchema = v.pipe(v.string(), v.isoTimestamp());

/**
 * Validates a date range where start <= end
 */
export const dateRangeSchema = v.pipe(
  v.object({
    start: isoDateSchema,
    end: isoDateSchema,
  }),
  v.check((data) => {
    return data.start <= data.end;
  }, 'Start date must be before or equal to end date'),
);

/**
 * Validates date picker configuration
 */
export const datePickerValueSchema = v.object({
  selectedDate: isoDateSchema,
  minDate: v.optional(isoDateSchema),
  maxDate: v.optional(isoDateSchema),
  disabledDates: v.optional(v.array(isoDateSchema)),
});

/**
 * Parses an ISO date string to a Date object
 * @deprecated Use parseISODate from date utils instead. Kept for backward compatibility.
 */
export const dateSchema = v.pipe(
  v.string(),
  v.regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format'),
  v.transform((val) => {
    const [year, month, day] = parseISOParts(val);
    return new Date(Date.UTC(year, month - 1, day));
  }),
);

/**
 * @deprecated Alias for dateSchema for backward compatibility
 */
export const temporalDateSchema = dateSchema;

export type DatePickerValue = v.InferOutput<typeof datePickerValueSchema>;
export type DateRange = v.InferOutput<typeof dateRangeSchema>;
