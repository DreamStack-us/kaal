import type React from 'react';
import type { DatePickerMode, DatePickerThemeOverrides } from '../../types';

export interface KaalDatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
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
   *
   * TODO: This is a temporary solution. In the future, we need to add full
   * locale support to handle different calendar formats, layouts, and
   * localized day/month names across different regions.
   */
  weekStartsOn?: 0 | 1;
  /** Custom theme overrides for styling without matching Kaal's theme structure */
  themeOverrides?: DatePickerThemeOverrides;
}

// Platform-specific implementations are handled by Metro's file resolution
// This file serves as the type definition and fallback
export const DatePicker: React.FC<KaalDatePickerProps> = (_props) => {
  // This should never be reached - Metro resolves platform-specific files
  return null;
};
