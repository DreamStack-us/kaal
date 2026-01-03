import { StyleSheet } from 'react-native-unistyles';
import { lightTheme, type LightTheme } from './themes/light';
import { darkTheme } from './themes/dark';
import { breakpoints } from './breakpoints';

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
