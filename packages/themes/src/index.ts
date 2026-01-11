import { StyleSheet } from 'react-native-unistyles';
import { breakpoints } from './breakpoints';
import { type DarkTheme, darkTheme } from './themes/dark';
import { type LightTheme, lightTheme } from './themes/light';

export { lightTheme, type LightTheme } from './themes/light';
export { darkTheme, type DarkTheme } from './themes/dark';
export { iosTheme } from './themes/ios';
export { androidTheme } from './themes/android';
export { breakpoints } from './breakpoints';
export { primitiveTokens } from './tokens/primitive';

type AppThemes = {
  light: LightTheme;
  dark: DarkTheme;
};

type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

/**
 * Deep merge utility for theme objects
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function deepMerge<T extends object>(target: T, source: DeepPartial<T>): T {
  const result = { ...target };

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (
      sourceValue !== undefined &&
      typeof sourceValue === 'object' &&
      sourceValue !== null &&
      !Array.isArray(sourceValue) &&
      typeof targetValue === 'object' &&
      targetValue !== null &&
      !Array.isArray(targetValue)
    ) {
      (result as any)[key] = deepMerge(targetValue as object, sourceValue as object);
    } else if (sourceValue !== undefined) {
      (result as any)[key] = sourceValue;
    }
  }

  return result;
}

/**
 * Custom theme overrides for configureKaalThemes
 */
export type CustomThemes = {
  light?: DeepPartial<LightTheme>;
  dark?: DeepPartial<DarkTheme>;
};

/**
 * Configure Kaal themes with optional custom overrides.
 *
 * @example
 * // Use default themes
 * configureKaalThemes();
 *
 * @example
 * // Override specific colors
 * configureKaalThemes({
 *   dark: {
 *     colors: {
 *       primary: { default: '#00D9FF' },
 *       datepicker: { cellSelected: '#00D9FF' },
 *       timepicker: { clockHand: '#00D9FF' },
 *     }
 *   }
 * });
 */
export const configureKaalThemes = (customThemes?: CustomThemes) => {
  StyleSheet.configure({
    themes: {
      light: customThemes?.light
        ? deepMerge(lightTheme, customThemes.light)
        : lightTheme,
      dark: customThemes?.dark
        ? deepMerge(darkTheme, customThemes.dark)
        : darkTheme,
    },
    breakpoints,
    settings: {
      adaptiveThemes: true,
    },
  });
};
