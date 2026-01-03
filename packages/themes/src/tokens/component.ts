import { primitiveTokens } from './primitive';

export const componentTokens = {
  datepicker: {
    light: {
      cellBackground: primitiveTokens.colors.transparent,
      cellSelected: primitiveTokens.colors.blue[600],
      cellToday: primitiveTokens.colors.blue[50],
      textDefault: primitiveTokens.colors.gray[900],
      textSelected: primitiveTokens.colors.white,
      textDisabled: primitiveTokens.colors.gray[300],
      textWeekend: primitiveTokens.colors.gray[500],
      headerBackground: primitiveTokens.colors.white,
      wheelHighlight: 'rgba(0, 0, 0, 0.04)',
    },
    dark: {
      cellBackground: primitiveTokens.colors.transparent,
      cellSelected: '#4DA6FF',
      cellToday: '#1E3A5F',
      textDefault: primitiveTokens.colors.white,
      textSelected: primitiveTokens.colors.white,
      textDisabled: '#555555',
      textWeekend: primitiveTokens.colors.gray[500],
      headerBackground: '#1E1E1E',
      wheelHighlight: 'rgba(255, 255, 255, 0.08)',
    },
  },
} as const;

export type ComponentTokens = typeof componentTokens;
