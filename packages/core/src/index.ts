// Auto-initialize unistyles with defaults if not configured
import './utils/initUnistyles';

// Date picker components
export { DatePicker, type KaalDatePickerProps } from './components';
export { CalendarGrid } from './components';
export { WheelPicker } from './components';

// Time picker components
export {
  TimePicker,
  TimeWheelPicker,
  ClockFace,
  MaterialTimePicker,
  type TimePickerProps,
  type TimeValue,
} from './components';

// Hooks
export { useDatePicker, useCalendar } from './hooks';
export {
  useTimePicker,
  to12Hour,
  to24Hour,
  formatTime,
  snapToInterval,
} from './hooks';

// Date utilities
export {
  toISODateString,
  toISODateTimeString,
  parseISODate,
  parseISODateTime,
  fromISODateString,
  fromISODateTimeString,
  getDateRange,
  isDateInRange,
  getUserTimezone,
  addDays,
  addMonths,
  compareDates,
  isSameDay,
  isSameMonth,
  getMonthDays,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getDayOfWeek,
  formatMonth,
  formatWeekday,
  formatYearMonth,
  today,
} from './utils';

// Validation schemas
export {
  isoDateSchema,
  isoDateTimeSchema,
  dateRangeSchema,
  datePickerValueSchema,
  dateSchema,
  temporalDateSchema,
} from './utils';

export type { DatePickerValue, DateRange } from './utils';
export type {
  DatePickerMode,
  DatePickerTheme,
  DatePickerVariant,
  DatePickerProps,
} from './types';

// Time picker types
export type {
  TimePeriod,
  ClockMode,
  Time12Hour,
  MinuteInterval,
  TimePickerTheme,
} from './types';
