import { Temporal } from '@js-temporal/polyfill';
import { z } from 'zod';

export const isoDateSchema = z
  .string()
  .date()
  .refine(
    (val) => {
      try {
        Temporal.PlainDate.from(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: 'Invalid ISO 8601 date format' },
  );

export const isoDateTimeSchema = z
  .string()
  .datetime({ offset: true })
  .describe('ISO 8601 datetime with timezone offset');

export const dateRangeSchema = z
  .object({
    start: isoDateSchema,
    end: isoDateSchema,
  })
  .refine(
    (data) => {
      const start = Temporal.PlainDate.from(data.start);
      const end = Temporal.PlainDate.from(data.end);
      return Temporal.PlainDate.compare(start, end) <= 0;
    },
    { message: 'Start date must be before or equal to end date' },
  );

export const datePickerValueSchema = z.object({
  selectedDate: isoDateSchema,
  minDate: isoDateSchema.optional(),
  maxDate: isoDateSchema.optional(),
  disabledDates: z.array(isoDateSchema).optional(),
});

export const temporalDateSchema = z
  .string()
  .date()
  .transform((val) => Temporal.PlainDate.from(val));

export type DatePickerValue = z.infer<typeof datePickerValueSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>;
