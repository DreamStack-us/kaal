import { primitiveTokens } from '../tokens/primitive';

export const lightTheme = {
  colors: {
    background: {
      default: primitiveTokens.colors.white,
      elevated: primitiveTokens.colors.gray[50],
      subtle: primitiveTokens.colors.gray[100],
    },
    foreground: {
      default: primitiveTokens.colors.gray[900],
      muted: primitiveTokens.colors.gray[700],
      subtle: primitiveTokens.colors.gray[500],
    },
    primary: {
      default: primitiveTokens.colors.blue[600],
      hover: primitiveTokens.colors.blue[700],
      pressed: primitiveTokens.colors.blue[900],
    },
    border: {
      default: primitiveTokens.colors.gray[200],
      strong: primitiveTokens.colors.gray[300],
    },
    datepicker: {
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

export type LightTheme = typeof lightTheme;
