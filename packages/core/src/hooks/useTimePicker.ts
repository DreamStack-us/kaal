import { useCallback, useState } from 'react';
import type {
  ClockMode,
  Time12Hour,
  TimePeriod,
  TimeValue,
} from '../types/timepicker';

interface UseTimePickerOptions {
  /** Initial hours (0-23) */
  initialHours?: number;
  /** Initial minutes (0-59) */
  initialMinutes?: number;
  /** Callback when time changes */
  onChange?: (time: TimeValue) => void;
  /** Use 24-hour format */
  is24Hour?: boolean;
  /** Minute interval for snapping */
  minuteInterval?: number;
}

/**
 * Converts 24-hour time to 12-hour format
 */
export const to12Hour = (hours: number): Time12Hour => {
  const period: TimePeriod = hours >= 12 ? 'PM' : 'AM';
  let hour = hours % 12;
  if (hour === 0) hour = 12;
  return { hour, period };
};

/**
 * Converts 12-hour time to 24-hour format
 */
export const to24Hour = (hour: number, period: TimePeriod): number => {
  if (period === 'AM') {
    return hour === 12 ? 0 : hour;
  }
  return hour === 12 ? 12 : hour + 12;
};

/**
 * Formats time as HH:MM string
 */
export const formatTime = (
  hours: number,
  minutes: number,
  is24Hour = false,
): string => {
  if (is24Hour) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  const { hour, period } = to12Hour(hours);
  return `${hour}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Snaps minutes to the nearest interval
 */
export const snapToInterval = (minutes: number, interval: number): number => {
  return Math.round(minutes / interval) * interval;
};

/**
 * Hook for managing time picker state
 */
export const useTimePicker = (options: UseTimePickerOptions = {}) => {
  const {
    initialHours = 0,
    initialMinutes = 0,
    onChange,
    is24Hour = false,
    minuteInterval = 1,
  } = options;

  const [hours, setHoursState] = useState(initialHours);
  const [minutes, setMinutesState] = useState(initialMinutes);
  const [clockMode, setClockMode] = useState<ClockMode>('hours');

  const setHours = useCallback(
    (newHours: number) => {
      const clampedHours = Math.max(0, Math.min(23, newHours));
      setHoursState(clampedHours);
      onChange?.({ hours: clampedHours, minutes });
    },
    [minutes, onChange],
  );

  const setMinutes = useCallback(
    (newMinutes: number) => {
      const snapped = snapToInterval(newMinutes, minuteInterval);
      const clampedMinutes = Math.max(0, Math.min(59, snapped));
      setMinutesState(clampedMinutes);
      onChange?.({ hours, minutes: clampedMinutes });
    },
    [hours, onChange, minuteInterval],
  );

  const setTime = useCallback(
    (time: TimeValue) => {
      const clampedHours = Math.max(0, Math.min(23, time.hours));
      const snapped = snapToInterval(time.minutes, minuteInterval);
      const clampedMinutes = Math.max(0, Math.min(59, snapped));
      setHoursState(clampedHours);
      setMinutesState(clampedMinutes);
      onChange?.({ hours: clampedHours, minutes: clampedMinutes });
    },
    [onChange, minuteInterval],
  );

  const setHours12 = useCallback(
    (hour: number, period: TimePeriod) => {
      const hours24 = to24Hour(hour, period);
      setHours(hours24);
    },
    [setHours],
  );

  const setPeriod = useCallback(
    (period: TimePeriod) => {
      const { hour } = to12Hour(hours);
      setHours(to24Hour(hour, period));
    },
    [hours, setHours],
  );

  const time12Hour = to12Hour(hours);

  return {
    // State
    hours,
    minutes,
    clockMode,
    // 12-hour format helpers
    hour12: time12Hour.hour,
    period: time12Hour.period,
    // Setters
    setHours,
    setMinutes,
    setTime,
    setHours12,
    setPeriod,
    setClockMode,
    // Formatting
    formatted: formatTime(hours, minutes, is24Hour),
    formatted12: formatTime(hours, minutes, false),
    formatted24: formatTime(hours, minutes, true),
    // Config
    is24Hour,
    minuteInterval,
  };
};
