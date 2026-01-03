import { lightTheme } from './light';

export const androidTheme = {
  ...lightTheme,
  radii: {
    ...lightTheme.radii,
    cell: 20,
    card: 28, // Material You large corner radius
    button: 20,
  },
  typography: {
    ...lightTheme.typography,
    dayCell: {
      fontSize: 14,
      fontWeight: '500' as const,
    },
  },
} as const;
