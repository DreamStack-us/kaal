import type { Temporal } from '@js-temporal/polyfill';
import type React from 'react';
import { Platform } from 'react-native';
import type { DatePickerMode } from '../../types';

export interface KaalDatePickerProps {
  value: Temporal.PlainDate;
  onChange: (date: Temporal.PlainDate) => void;
  mode?: DatePickerMode;
  theme?: 'native' | 'ios' | 'android' | 'custom';
  variant?: 'wheel' | 'calendar' | 'compact';
  minDate?: Temporal.PlainDate;
  maxDate?: Temporal.PlainDate;
  disabledDates?: Temporal.PlainDate[];
  locale?: string;
}

// Platform-specific implementations are handled by Metro's file resolution
// This file serves as the type definition and fallback
export const DatePicker: React.FC<KaalDatePickerProps> = (_props) => {
  // This should never be reached - Metro resolves platform-specific files
  return null;
};
