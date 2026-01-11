import { componentTokens } from '../tokens/component';
import { primitiveTokens } from '../tokens/primitive';

export const darkTheme = {
  colors: {
    background: {
      default: '#121212',
      elevated: '#1E1E1E',
      subtle: '#2C2C2C',
    },
    foreground: {
      default: primitiveTokens.colors.white,
      muted: primitiveTokens.colors.gray[300],
      subtle: primitiveTokens.colors.gray[500],
    },
    primary: {
      default: '#4DA6FF',
      hover: '#7BBFFF',
      pressed: '#2196F3',
    },
    border: {
      default: '#333333',
      strong: '#444444',
    },
    datepicker: {
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
    timepicker: componentTokens.timepicker.dark,
  },
  spacing: (multiplier: number) => multiplier * 4,
  radii: {
    cell: primitiveTokens.radii.full,
    card: primitiveTokens.radii.xl,
    button: primitiveTokens.radii.md,
  },
  typography: {
    dayCell: {
      fontSize: primitiveTokens.fontSizes.sm,
      fontWeight: primitiveTokens.fontWeights.normal,
    },
    dayHeader: {
      fontSize: primitiveTokens.fontSizes.xs,
      fontWeight: primitiveTokens.fontWeights.medium,
    },
    monthHeader: {
      fontSize: primitiveTokens.fontSizes.lg,
      fontWeight: primitiveTokens.fontWeights.semibold,
    },
  },
} as const;

export type DarkTheme = typeof darkTheme;
