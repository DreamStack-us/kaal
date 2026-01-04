import { StyleSheet } from 'react-native-unistyles';
import { breakpoints } from './breakpoints';
import { darkTheme } from './themes/dark';
import { type LightTheme, lightTheme } from './themes/light';

export { lightTheme } from './themes/light';
export { darkTheme } from './themes/dark';
export { iosTheme } from './themes/ios';
export { androidTheme } from './themes/android';
export { breakpoints } from './breakpoints';
export { primitiveTokens } from './tokens/primitive';

type AppThemes = {
  light: LightTheme;
  dark: typeof darkTheme;
};

type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

export const configureKaalThemes = () => {
  StyleSheet.configure({
    themes: { light: lightTheme, dark: darkTheme },
    breakpoints,
    settings: {
      adaptiveThemes: true,
    },
  });
};
