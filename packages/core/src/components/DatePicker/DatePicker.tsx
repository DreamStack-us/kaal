import type React from 'react';
import type { DatePickerMode } from '../../types';

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
}

// Platform-specific implementations are handled by Metro's file resolution
// This file serves as the type definition and fallback
export const DatePicker: React.FC<KaalDatePickerProps> = (_props) => {
  // This should never be reached - Metro resolves platform-specific files
  return null;
};
