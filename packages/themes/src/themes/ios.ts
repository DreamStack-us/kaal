import { lightTheme } from './light';

export const iosTheme = {
  ...lightTheme,
  radii: {
    ...lightTheme.radii,
    cell: 22, // Half of 44px cell size for perfect circle
    card: 14, // iOS standard corner radius
    button: 10,
  },
  typography: {
    ...lightTheme.typography,
    dayCell: {
      fontSize: 17,
      fontWeight: '400' as const,
    },
  },
} as const;
