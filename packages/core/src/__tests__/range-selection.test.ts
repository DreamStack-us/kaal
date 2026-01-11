import { describe, expect, test } from 'bun:test';
import {
  compareDates,
  isSameDay,
  parseISODate,
  toISODateString,
} from '../utils/date';

/**
 * Tests for date range selection logic
 * These test the core algorithms used in CalendarGrid for range selection
 */

// Helper function that mirrors the range selection logic in CalendarGrid
function handleRangeSelection(
  date: Date,
  rangeStart: Date | null,
  rangeEnd: Date | null,
): { startDate: Date; endDate: Date | null } {
  // 1. If no start date, or both dates exist, reset to new start
  if (!rangeStart || (rangeStart && rangeEnd)) {
    return { startDate: date, endDate: null };
  }

  // 2. Have start but no end
  if (compareDates(date, rangeStart) < 0) {
    // Clicked before start - make this the new start
    return { startDate: date, endDate: null };
  }

  if (isSameDay(date, rangeStart)) {
    // Clicked same day - keep as start, no end
    return { startDate: date, endDate: null };
  }

  // Clicked after start - set as end date
  return { startDate: rangeStart, endDate: date };
}

// Helper to check if a date is in range (between start and end, exclusive)
function isDateInRange(
  date: Date,
  rangeStart: Date | null,
  rangeEnd: Date | null,
): boolean {
  if (!rangeStart || !rangeEnd) return false;
  return (
    compareDates(date, rangeStart) > 0 && compareDates(date, rangeEnd) < 0
  );
}

describe('Range Selection Logic', () => {
  describe('handleRangeSelection', () => {
    test('first selection sets start date', () => {
      const date = parseISODate('2024-01-15');
      const result = handleRangeSelection(date, null, null);

      expect(toISODateString(result.startDate)).toBe('2024-01-15');
      expect(result.endDate).toBeNull();
    });

    test('second selection after start sets end date', () => {
      const start = parseISODate('2024-01-10');
      const date = parseISODate('2024-01-20');
      const result = handleRangeSelection(date, start, null);

      expect(toISODateString(result.startDate)).toBe('2024-01-10');
      expect(result.endDate).not.toBeNull();
      expect(toISODateString(result.endDate!)).toBe('2024-01-20');
    });

    test('selection before start resets to new start', () => {
      const start = parseISODate('2024-01-15');
      const date = parseISODate('2024-01-05');
      const result = handleRangeSelection(date, start, null);

      expect(toISODateString(result.startDate)).toBe('2024-01-05');
      expect(result.endDate).toBeNull();
    });

    test('selecting same day as start keeps start only', () => {
      const start = parseISODate('2024-01-15');
      const date = parseISODate('2024-01-15');
      const result = handleRangeSelection(date, start, null);

      expect(toISODateString(result.startDate)).toBe('2024-01-15');
      expect(result.endDate).toBeNull();
    });

    test('selection when both dates exist resets to new start', () => {
      const start = parseISODate('2024-01-10');
      const end = parseISODate('2024-01-20');
      const date = parseISODate('2024-01-25');
      const result = handleRangeSelection(date, start, end);

      expect(toISODateString(result.startDate)).toBe('2024-01-25');
      expect(result.endDate).toBeNull();
    });

    test('selecting in middle of existing range resets to new start', () => {
      const start = parseISODate('2024-01-10');
      const end = parseISODate('2024-01-20');
      const date = parseISODate('2024-01-15');
      const result = handleRangeSelection(date, start, end);

      expect(toISODateString(result.startDate)).toBe('2024-01-15');
      expect(result.endDate).toBeNull();
    });
  });

  describe('isDateInRange', () => {
    const start = parseISODate('2024-01-10');
    const end = parseISODate('2024-01-20');

    test('returns true for date between start and end', () => {
      const date = parseISODate('2024-01-15');
      expect(isDateInRange(date, start, end)).toBe(true);
    });

    test('returns false for date before start', () => {
      const date = parseISODate('2024-01-05');
      expect(isDateInRange(date, start, end)).toBe(false);
    });

    test('returns false for date after end', () => {
      const date = parseISODate('2024-01-25');
      expect(isDateInRange(date, start, end)).toBe(false);
    });

    test('returns false for start date (exclusive)', () => {
      expect(isDateInRange(start, start, end)).toBe(false);
    });

    test('returns false for end date (exclusive)', () => {
      expect(isDateInRange(end, start, end)).toBe(false);
    });

    test('returns false when start is null', () => {
      const date = parseISODate('2024-01-15');
      expect(isDateInRange(date, null, end)).toBe(false);
    });

    test('returns false when end is null', () => {
      const date = parseISODate('2024-01-15');
      expect(isDateInRange(date, start, null)).toBe(false);
    });

    test('returns false when both are null', () => {
      const date = parseISODate('2024-01-15');
      expect(isDateInRange(date, null, null)).toBe(false);
    });
  });

  describe('Range Selection Edge Cases', () => {
    test('handles month boundary range', () => {
      const start = parseISODate('2024-01-28');
      const date = parseISODate('2024-02-05');
      const result = handleRangeSelection(date, start, null);

      expect(toISODateString(result.startDate)).toBe('2024-01-28');
      expect(toISODateString(result.endDate!)).toBe('2024-02-05');

      // Check middle date is in range
      const middleDate = parseISODate('2024-02-01');
      expect(isDateInRange(middleDate, result.startDate, result.endDate)).toBe(
        true,
      );
    });

    test('handles year boundary range', () => {
      const start = parseISODate('2023-12-28');
      const date = parseISODate('2024-01-05');
      const result = handleRangeSelection(date, start, null);

      expect(toISODateString(result.startDate)).toBe('2023-12-28');
      expect(toISODateString(result.endDate!)).toBe('2024-01-05');

      // Check Dec 31 is in range
      const newYearsEve = parseISODate('2023-12-31');
      expect(isDateInRange(newYearsEve, result.startDate, result.endDate)).toBe(
        true,
      );
    });

    test('single day range (start == end - 1 day)', () => {
      const start = parseISODate('2024-01-15');
      const end = parseISODate('2024-01-16');

      // No dates should be "in range" for adjacent days
      const testDate = parseISODate('2024-01-15');
      expect(isDateInRange(testDate, start, end)).toBe(false);
    });
  });
});
