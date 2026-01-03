import { Temporal } from '@js-temporal/polyfill';

export const toISODateString = (date: Temporal.PlainDate): string => {
  return date.toString();
};

export const toISODateTimeString = (
  date: Temporal.PlainDate,
  time: Temporal.PlainTime,
  timeZone?: string
): string => {
  const tz = timeZone ?? Temporal.Now.timeZoneId();
  const zdt = date.toZonedDateTime({ timeZone: tz, plainTime: time });
  return zdt.toString({ timeZoneName: 'never' });
};

export const fromISODateString = (iso: string): Temporal.PlainDate => {
  return Temporal.PlainDate.from(iso);
};

export const fromISODateTimeString = (iso: string): Temporal.ZonedDateTime => {
  return Temporal.Instant.from(iso).toZonedDateTimeISO(Temporal.Now.timeZoneId());
};

export const getDateRange = (
  start: Temporal.PlainDate,
  end: Temporal.PlainDate
): Temporal.PlainDate[] => {
  const dates: Temporal.PlainDate[] = [];
  let current = start;

  while (Temporal.PlainDate.compare(current, end) <= 0) {
    dates.push(current);
    current = current.add({ days: 1 });
  }

  return dates;
};

export const isDateInRange = (
  date: Temporal.PlainDate,
  minDate?: Temporal.PlainDate,
  maxDate?: Temporal.PlainDate
): boolean => {
  if (minDate && Temporal.PlainDate.compare(date, minDate) < 0) return false;
  if (maxDate && Temporal.PlainDate.compare(date, maxDate) > 0) return false;
  return true;
};

export const getUserTimezone = (): string => {
  return Temporal.Now.timeZoneId();
};
