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
 * Theme overrides for TimePicker components.
 * These allow customizing colors without matching Kaal's internal theme structure.
 */
export interface TimePickerThemeOverrides {
  // Clock face (Material style)
  /** Background color of the clock face */
  clockBackground?: string;
  /** Color of the clock hand */
  clockHandColor?: string;
  /** Color of clock numbers */
  clockTextColor?: string;
  /** Color of selected clock number */
  clockTextSelectedColor?: string;
  /** Color of the center dot */
  clockCenterColor?: string;
  /** Color of the selection dot on clock edge */
  clockSelectionColor?: string;

  // Period toggle (AM/PM)
  /** Background color of period buttons */
  periodBackground?: string;
  /** Background color of active period button */
  periodActiveBackground?: string;
  /** Border color of period buttons */
  periodBorderColor?: string;
  /** Text color of period buttons */
  periodTextColor?: string;
  /** Text color of active period button */
  periodTextActiveColor?: string;

  // Time field (header display)
  /** Background color of time fields */
  timeFieldBackground?: string;
  /** Background color of active time field */
  timeFieldActiveBackground?: string;
  /** Text color of time fields */
  textColor?: string;
  /** Text color of active time field */
  textActiveColor?: string;
  /** Color of the colon separator */
  separatorColor?: string;

  // Wheel picker (iOS style)
  /** Background color of wheel picker */
  wheelContainerBackground?: string;
  /** Color of wheel selection highlight */
  wheelSelectionHighlight?: string;
  /** Color of wheel separator */
  wheelSeparatorColor?: string;
  /** Text color in wheel */
  wheelTextColor?: string;
  /** Text color of selected wheel item */
  wheelTextSelectedColor?: string;

  // Material container
  /** Container background color */
  containerBackground?: string;
  /** Header text color */
  headerColor?: string;
  /** Action button text color */
  actionButtonColor?: string;

  // General
  /** Primary accent color */
  primaryColor?: string;
  /** Border radius for container */
  borderRadius?: number;
  /** Generic background color (fallback for all container backgrounds) */
  backgroundColor?: string;
}

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
  /** Custom theme overrides for styling without matching Kaal's theme structure */
  themeOverrides?: TimePickerThemeOverrides;
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
