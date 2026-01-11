import { createContext, useContext } from 'react';
import type { DatePickerThemeOverrides } from '../types/datepicker';
import type { TimePickerThemeOverrides } from '../types/timepicker';

/**
 * Combined theme overrides context value
 */
export interface ThemeOverrideContextValue {
  datePicker?: DatePickerThemeOverrides;
  timePicker?: TimePickerThemeOverrides;
}

const ThemeOverrideContext = createContext<ThemeOverrideContextValue>({});

export const ThemeOverrideProvider = ThemeOverrideContext.Provider;

/**
 * Hook to access DatePicker theme overrides
 */
export function useDatePickerOverrides(): DatePickerThemeOverrides | undefined {
  const context = useContext(ThemeOverrideContext);
  return context.datePicker;
}

/**
 * Hook to access TimePicker theme overrides
 */
export function useTimePickerOverrides(): TimePickerThemeOverrides | undefined {
  const context = useContext(ThemeOverrideContext);
  return context.timePicker;
}

/**
 * Hook to access all theme overrides
 */
export function useThemeOverrides(): ThemeOverrideContextValue {
  return useContext(ThemeOverrideContext);
}
