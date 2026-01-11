import { StyleSheet } from 'react-native';

/**
 * Default styles for CalendarGrid using plain React Native StyleSheet.
 * Colors use dark theme defaults - consumers override via themeOverrides prop.
 */
export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  navText: {
    fontSize: 24,
    color: '#4DA6FF',
    fontWeight: '600',
  },
  monthTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
    color: '#8E8E93',
  },
});
