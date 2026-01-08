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
  timepicker: {
    light: {
      // Clock face (Material style)
      clockBackground: primitiveTokens.colors.gray[100],
      clockHand: primitiveTokens.colors.blue[600],
      clockNumber: primitiveTokens.colors.gray[900],
      clockNumberSelected: primitiveTokens.colors.white,
      clockCenter: primitiveTokens.colors.blue[600],
      selectionDot: primitiveTokens.colors.blue[600],
      // Period toggle (AM/PM)
      periodBackground: primitiveTokens.colors.transparent,
      periodBackgroundActive: primitiveTokens.colors.blue[50],
      periodBorder: primitiveTokens.colors.gray[300],
      periodText: primitiveTokens.colors.gray[700],
      periodTextActive: primitiveTokens.colors.blue[600],
      // Time field (Material header)
      timeFieldBackground: primitiveTokens.colors.gray[100],
      timeFieldBackgroundActive: primitiveTokens.colors.blue[600],
      timeFieldText: primitiveTokens.colors.gray[900],
      timeFieldTextActive: primitiveTokens.colors.white,
      // Wheel picker (iOS style)
      wheelBackground: 'rgba(255, 255, 255, 0.9)',
      wheelSeparator: primitiveTokens.colors.gray[300],
      wheelText: primitiveTokens.colors.gray[900],
      wheelTextSelected: primitiveTokens.colors.gray[900],
    },
    dark: {
      // Clock face (Material style)
      clockBackground: '#3F384C',
      clockHand: '#4DA6FF',
      clockNumber: '#E6E1E5',
      clockNumberSelected: primitiveTokens.colors.white,
      clockCenter: '#4DA6FF',
      selectionDot: '#4DA6FF',
      // Period toggle (AM/PM)
      periodBackground: primitiveTokens.colors.transparent,
      periodBackgroundActive: 'rgba(77, 166, 255, 0.2)',
      periodBorder: '#938F99',
      periodText: '#CAC4D0',
      periodTextActive: '#4DA6FF',
      // Time field (Material header)
      timeFieldBackground: '#4A4458',
      timeFieldBackgroundActive: '#4DA6FF',
      timeFieldText: '#E6E1E5',
      timeFieldTextActive: primitiveTokens.colors.white,
      // Wheel picker (iOS style)
      wheelBackground: 'rgba(30, 30, 30, 0.9)',
      wheelSeparator: 'rgba(255, 255, 255, 0.15)',
      wheelText: primitiveTokens.colors.white,
      wheelTextSelected: primitiveTokens.colors.white,
    },
  },
} as const;

export type ComponentTokens = typeof componentTokens;
