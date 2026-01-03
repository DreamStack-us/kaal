import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.radii.card,
    padding: theme.spacing(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    paddingHorizontal: theme.spacing(2),
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radii.button,
  },
  navText: {
    fontSize: 24,
    color: theme.colors.primary.default,
    fontWeight: '600',
  },
  monthTitle: {
    fontSize: theme.typography.monthHeader.fontSize,
    fontWeight: theme.typography.monthHeader.fontWeight,
    color: theme.colors.foreground.default,
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: theme.typography.dayHeader.fontSize,
    fontWeight: theme.typography.dayHeader.fontWeight,
    color: theme.colors.foreground.muted,
  },
}));
