import { Platform, StyleSheet } from 'react-native';

/**
 * Default styles for DatePicker using plain React Native StyleSheet.
 * Colors use dark theme defaults - consumers override via themeOverrides prop.
 */
export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
  },
  containerCompact: {
    padding: 8,
  },
  containerLarge: {
    padding: 24,
  },
  backdrop: Platform.select({
    web: {
      // @ts-ignore - web-only properties
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    default: {
      backgroundColor: 'transparent',
    },
  }),
});
