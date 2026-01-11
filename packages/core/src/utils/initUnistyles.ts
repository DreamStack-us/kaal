import { StyleSheet } from 'react-native-unistyles';

// Default light theme for auto-initialization
const defaultLightTheme = {
  colors: {
    background: {
      default: '#FFFFFF',
      elevated: '#F2F2F7',
      subtle: '#F9F9F9',
    },
    foreground: {
      default: '#1C1C1E',
      muted: '#8E8E93',
      subtle: '#AEAEB2',
    },
    primary: {
      default: '#007AFF',
      hover: '#0056B3',
      pressed: '#003D80',
    },
    border: {
      default: '#E5E5EA',
      strong: '#C6C6C8',
    },
    datepicker: {
      cellBackground: 'transparent',
      cellSelected: '#007AFF',
      cellToday: 'rgba(0, 122, 255, 0.1)',
      textDefault: '#1C1C1E',
      textSelected: '#FFFFFF',
      textDisabled: '#8E8E93',
      textWeekend: '#8E8E93',
      headerBackground: '#FFFFFF',
      wheelHighlight: 'rgba(0, 0, 0, 0.04)',
    },
    timepicker: {
      clockBackground: '#F2F2F7',
      clockHand: '#007AFF',
      clockNumber: '#1C1C1E',
      clockNumberSelected: '#FFFFFF',
      clockCenter: '#007AFF',
      selectionDot: '#007AFF',
      periodBackground: 'transparent',
      periodBackgroundActive: 'rgba(0, 122, 255, 0.1)',
      periodBorder: '#C6C6C8',
      periodText: '#8E8E93',
      periodTextActive: '#007AFF',
      timeFieldBackground: '#F2F2F7',
      timeFieldBackgroundActive: '#007AFF',
      timeFieldText: '#1C1C1E',
      timeFieldTextActive: '#FFFFFF',
      wheelBackground: 'rgba(255, 255, 255, 0.9)',
      wheelSeparator: '#C6C6C8',
      wheelText: '#1C1C1E',
      wheelTextSelected: '#1C1C1E',
    },
  },
  spacing: (n: number) => n * 4,
  radii: {
    card: 14,
    button: 8,
    cell: 22,
  },
  typography: {
    monthHeader: { fontSize: 17, fontWeight: '600' as const },
    dayHeader: { fontSize: 13, fontWeight: '600' as const },
    dayCell: { fontSize: 17, fontWeight: '400' as const },
  },
};

const defaultDarkTheme = {
  ...defaultLightTheme,
  colors: {
    ...defaultLightTheme.colors,
    background: {
      default: '#1C1C1E',
      elevated: '#2C2C2E',
      subtle: '#3A3A3C',
    },
    foreground: {
      default: '#FFFFFF',
      muted: '#E0E0E0',
      subtle: '#9E9E9E',
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
      cellBackground: 'transparent',
      cellSelected: '#4DA6FF',
      cellToday: '#1E3A5F',
      textDefault: '#FFFFFF',
      textSelected: '#FFFFFF',
      textDisabled: '#555555',
      textWeekend: '#9E9E9E',
      headerBackground: '#1E1E1E',
      wheelHighlight: 'rgba(255, 255, 255, 0.08)',
    },
    timepicker: {
      clockBackground: '#3A3A3C',
      clockHand: '#0A84FF',
      clockNumber: '#FFFFFF',
      clockNumberSelected: '#FFFFFF',
      clockCenter: '#0A84FF',
      selectionDot: '#0A84FF',
      periodBackground: 'transparent',
      periodBackgroundActive: 'rgba(10, 132, 255, 0.2)',
      periodBorder: '#48484A',
      periodText: '#8E8E93',
      periodTextActive: '#0A84FF',
      timeFieldBackground: '#3A3A3C',
      timeFieldBackgroundActive: '#0A84FF',
      timeFieldText: '#FFFFFF',
      timeFieldTextActive: '#FFFFFF',
      wheelBackground: 'rgba(30, 30, 30, 0.9)',
      wheelSeparator: 'rgba(255, 255, 255, 0.15)',
      wheelText: '#FFFFFF',
      wheelTextSelected: '#FFFFFF',
    },
  },
};

// Auto-configure unistyles with defaults if not already configured
let isConfigured = false;

export const ensureUnistylesConfigured = () => {
  if (isConfigured) return;

  try {
    // Try to configure with defaults
    // Using type assertion because this is fallback initialization
    // and the consumer may have their own theme types
    StyleSheet.configure({
      themes: {
        light: defaultLightTheme as any,
        dark: defaultDarkTheme as any,
      },
      settings: {
        adaptiveThemes: true,
      },
    });
    isConfigured = true;
  } catch (e) {
    // Already configured by consumer, that's fine
    isConfigured = true;
  }
};

// Auto-init on module load
ensureUnistylesConfigured();
