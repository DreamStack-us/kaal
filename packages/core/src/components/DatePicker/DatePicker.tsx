import type React from 'react';
import type {
  DatePickerMode,
  DatePickerThemeOverrides,
  DateRange,
} from '../../types';

interface KaalDatePickerBaseProps {
  mode?: DatePickerMode;
  theme?: 'native' | 'ios' | 'android' | 'custom';
  variant?: 'wheel' | 'calendar' | 'compact';
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale?: string;
  /**
   * First day of the week: 0 = Sunday, 1 = Monday
   * @default 0 (Sunday)
   */
  weekStartsOn?: 0 | 1;
  /** Custom theme overrides for styling without matching Kaal's theme structure */
  themeOverrides?: DatePickerThemeOverrides;
}

interface KaalDatePickerSingleProps extends KaalDatePickerBaseProps {
  selectionMode?: 'single';
  value: Date;
  onChange: (date: Date) => void;
  startDate?: never;
  endDate?: never;
  onRangeChange?: never;
}

interface KaalDatePickerRangeProps extends KaalDatePickerBaseProps {
  selectionMode: 'range';
  startDate: Date | null;
  endDate: Date | null;
  onRangeChange: (range: DateRange) => void;
  value?: never;
  onChange?: never;
}

export type KaalDatePickerProps =
  | KaalDatePickerSingleProps
  | KaalDatePickerRangeProps;

// Platform-specific implementations are handled by Metro's file resolution
// This file serves as the type definition and fallback
export const DatePicker: React.FC<KaalDatePickerProps> = (_props) => {
  // This should never be reached - Metro resolves platform-specific files
  return null;
};
