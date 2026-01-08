/**
 * Represents a time value in 24-hour format
 */
export interface TimeValue {
  /** Hours in 24-hour format (0-23) */
  hours: number;
  /** Minutes (0-59) */
  minutes: number;
}

/**
 * Theme options for TimePicker appearance
 */
export type TimePickerTheme = 'native' | 'ios' | 'android';

/**
 * Minute interval options for time selection
 */
export type MinuteInterval = 1 | 5 | 10 | 15 | 30;

/**
 * Props for the TimePicker component
 */
export interface TimePickerProps {
  /** Current time value */
  value: TimeValue;
  /** Callback when time changes */
  onChange: (time: TimeValue) => void;
  /** Visual theme - 'native' uses platform defaults */
  theme?: TimePickerTheme;
  /** Interval for minute selection */
  minuteInterval?: MinuteInterval;
  /** Use 24-hour format instead of 12-hour with AM/PM */
  is24Hour?: boolean;
  /** Minimum selectable time */
  minTime?: TimeValue;
  /** Maximum selectable time */
  maxTime?: TimeValue;
}

/**
 * Period indicator for 12-hour format
 */
export type TimePeriod = 'AM' | 'PM';

/**
 * Clock mode for Material-style picker
 */
export type ClockMode = 'hours' | 'minutes';

/**
 * 12-hour time representation
 */
export interface Time12Hour {
  /** Hour in 12-hour format (1-12) */
  hour: number;
  /** AM or PM */
  period: TimePeriod;
}
