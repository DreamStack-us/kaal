export type DatePickerMode = 'date' | 'time' | 'datetime';

export type DatePickerTheme = 'native' | 'ios' | 'android' | 'custom';

export type DatePickerVariant = 'wheel' | 'calendar' | 'compact';

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
}
