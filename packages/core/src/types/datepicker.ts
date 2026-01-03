import type { Temporal } from '@js-temporal/polyfill';

export type DatePickerMode = 'date' | 'time' | 'datetime';

export type DatePickerTheme = 'native' | 'ios' | 'android' | 'custom';

export type DatePickerVariant = 'wheel' | 'calendar' | 'compact';

export interface DatePickerProps {
  value: Temporal.PlainDate;
  onChange: (date: Temporal.PlainDate) => void;
  mode?: DatePickerMode;
  theme?: DatePickerTheme;
  variant?: DatePickerVariant;
  minDate?: Temporal.PlainDate;
  maxDate?: Temporal.PlainDate;
  disabledDates?: Temporal.PlainDate[];
  locale?: string;
}
