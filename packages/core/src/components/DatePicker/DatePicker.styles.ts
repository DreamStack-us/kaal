import { StyleSheet, UnistylesVariants } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.radii.card,
    overflow: 'hidden',
    variants: {
      size: {
        compact: {
          padding: theme.spacing(2),
        },
        default: {
          padding: theme.spacing(4),
        },
        large: {
          padding: theme.spacing(6),
        },
      },
    },
  },
  backdrop: {
    ...rt.platform.select({
      web: {
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
      },
      default: {
        backgroundColor: theme.colors.background.elevated,
      },
    }),
  },
}));

export type DatePickerVariants = UnistylesVariants<typeof styles>;
