export type DatePickerMode = 'date' | 'time' | 'datetime';

export type DatePickerTheme = 'native' | 'ios' | 'android' | 'custom';

export type DatePickerVariant = 'wheel' | 'calendar' | 'compact';

/**
 * Theme overrides for DatePicker components.
 * These allow customizing colors without matching Kaal's internal theme structure.
 */
export interface DatePickerThemeOverrides {
  // Calendar cell colors
  /** Background color of selected date cell */
  cellSelectedColor?: string;
  /** Background color of today's date cell */
  cellTodayColor?: string;
  /** Default text color for dates */
  textColor?: string;
  /** Text color for selected date */
  textSelectedColor?: string;
  /** Text color for disabled dates */
  textDisabledColor?: string;
  /** Text color for weekend dates */
  textWeekendColor?: string;
  /** Primary accent color (navigation arrows, today border) */
  primaryColor?: string;
  /** Header background color */
  headerBackground?: string;
  /** Container background color */
  backgroundColor?: string;
  // Layout
  /** Border radius for calendar container */
  borderRadius?: number;
  /** Border radius for date cells */
  cellBorderRadius?: number;
  /** Padding for calendar container */
  padding?: number;
}

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  mode?: DatePickerMode;
  theme?: DatePickerTheme;
  variant?: DatePickerVariant;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale?: string;
  /**
   * First day of the week: 0 = Sunday, 1 = Monday
   * @default 0 (Sunday)
   *
   * TODO: This is a temporary solution. In the future, we need to add full
   * locale support to handle different calendar formats, layouts, and
   * localized day/month names across different regions.
   */
  weekStartsOn?: 0 | 1;
  /** Custom theme overrides for styling without matching Kaal's theme structure */
  themeOverrides?: DatePickerThemeOverrides;
}
