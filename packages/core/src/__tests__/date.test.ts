import { describe, expect, test } from 'bun:test';
import {
  addDays,
  addMonths,
  compareDates,
  formatMonth,
  formatYearMonth,
  getDayOfWeek,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthDays,
  isSameDay,
  isSameMonth,
  parseISODate,
  toISODateString,
  today,
} from '../utils/date';

describe('date utilities', () => {
  describe('toISODateString', () => {
    test('formats date to YYYY-MM-DD', () => {
      const date = new Date(Date.UTC(2024, 0, 15));
      expect(toISODateString(date)).toBe('2024-01-15');
    });

    test('pads month and day with zeros', () => {
      const date = new Date(Date.UTC(2024, 5, 5));
      expect(toISODateString(date)).toBe('2024-06-05');
    });
  });

  describe('parseISODate', () => {
    test('parses YYYY-MM-DD string', () => {
      const date = parseISODate('2024-01-15');
      expect(date.getUTCFullYear()).toBe(2024);
      expect(date.getUTCMonth()).toBe(0);
      expect(date.getUTCDate()).toBe(15);
    });
  });

  describe('addDays', () => {
    test('adds positive days', () => {
      const date = parseISODate('2024-01-15');
      const result = addDays(date, 5);
      expect(toISODateString(result)).toBe('2024-01-20');
    });

    test('handles month overflow', () => {
      const date = parseISODate('2024-01-30');
      const result = addDays(date, 5);
      expect(toISODateString(result)).toBe('2024-02-04');
    });
  });

  describe('addMonths', () => {
    test('adds positive months', () => {
      const date = parseISODate('2024-01-15');
      const result = addMonths(date, 2);
      expect(toISODateString(result)).toBe('2024-03-15');
    });

    test('handles day overflow (Jan 31 + 1 month)', () => {
      const date = parseISODate('2024-01-31');
      const result = addMonths(date, 1);
      expect(toISODateString(result)).toBe('2024-02-29'); // 2024 is leap year
    });

    test('handles year overflow', () => {
      const date = parseISODate('2024-11-15');
      const result = addMonths(date, 3);
      expect(toISODateString(result)).toBe('2025-02-15');
    });
  });

  describe('compareDates', () => {
    test('returns negative when a < b', () => {
      const a = parseISODate('2024-01-01');
      const b = parseISODate('2024-01-02');
      expect(compareDates(a, b)).toBeLessThan(0);
    });

    test('returns positive when a > b', () => {
      const a = parseISODate('2024-01-02');
      const b = parseISODate('2024-01-01');
      expect(compareDates(a, b)).toBeGreaterThan(0);
    });

    test('returns 0 when equal', () => {
      const a = parseISODate('2024-01-15');
      const b = parseISODate('2024-01-15');
      expect(compareDates(a, b)).toBe(0);
    });
  });

  describe('isSameDay', () => {
    test('returns true for same day', () => {
      const a = parseISODate('2024-01-15');
      const b = parseISODate('2024-01-15');
      expect(isSameDay(a, b)).toBe(true);
    });

    test('returns false for different days', () => {
      const a = parseISODate('2024-01-15');
      const b = parseISODate('2024-01-16');
      expect(isSameDay(a, b)).toBe(false);
    });
  });

  describe('isSameMonth', () => {
    test('returns true for same month', () => {
      const a = parseISODate('2024-01-15');
      const b = parseISODate('2024-01-20');
      expect(isSameMonth(a, b)).toBe(true);
    });

    test('returns false for different months', () => {
      const a = parseISODate('2024-01-15');
      const b = parseISODate('2024-02-15');
      expect(isSameMonth(a, b)).toBe(false);
    });
  });

  describe('getMonthDays', () => {
    test('returns correct days for January', () => {
      const days = getMonthDays(2024, 0);
      expect(days).toHaveLength(31);
      const firstDay = days[0];
      const lastDay = days[30];
      if (firstDay && lastDay) {
        expect(toISODateString(firstDay)).toBe('2024-01-01');
        expect(toISODateString(lastDay)).toBe('2024-01-31');
      }
    });

    test('returns correct days for February leap year', () => {
      const days = getMonthDays(2024, 1);
      expect(days).toHaveLength(29);
    });

    test('returns correct days for February non-leap year', () => {
      const days = getMonthDays(2023, 1);
      expect(days).toHaveLength(28);
    });
  });

  describe('getFirstDayOfMonth', () => {
    test('returns first day of month', () => {
      const date = parseISODate('2024-01-15');
      const first = getFirstDayOfMonth(date);
      expect(toISODateString(first)).toBe('2024-01-01');
    });
  });

  describe('getLastDayOfMonth', () => {
    test('returns last day of month', () => {
      const date = parseISODate('2024-01-15');
      const last = getLastDayOfMonth(date);
      expect(toISODateString(last)).toBe('2024-01-31');
    });

    test('handles February leap year', () => {
      const date = parseISODate('2024-02-15');
      const last = getLastDayOfMonth(date);
      expect(toISODateString(last)).toBe('2024-02-29');
    });
  });

  describe('getDayOfWeek', () => {
    test('returns 0 for Sunday', () => {
      const date = parseISODate('2024-01-07'); // Sunday
      expect(getDayOfWeek(date)).toBe(0);
    });

    test('returns 1 for Monday', () => {
      const date = parseISODate('2024-01-08'); // Monday
      expect(getDayOfWeek(date)).toBe(1);
    });
  });

  describe('formatMonth', () => {
    test('formats month name', () => {
      const date = parseISODate('2024-01-15');
      expect(formatMonth(date, 'en-US', 'long')).toBe('January');
    });
  });

  describe('formatYearMonth', () => {
    test('formats year and month', () => {
      const date = parseISODate('2024-01-15');
      const formatted = formatYearMonth(date, 'en-US');
      expect(formatted).toContain('January');
      expect(formatted).toContain('2024');
    });
  });

  describe('today', () => {
    test('returns a Date object', () => {
      const result = today();
      expect(result).toBeInstanceOf(Date);
    });

    test('returns date at midnight UTC', () => {
      const result = today();
      expect(result.getUTCHours()).toBe(0);
      expect(result.getUTCMinutes()).toBe(0);
      expect(result.getUTCSeconds()).toBe(0);
    });
  });
});
