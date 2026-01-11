import { StyleSheet } from 'react-native';

/**
 * Default styles for WheelPicker using plain React Native StyleSheet.
 * Colors use dark theme defaults - consumers override via themeOverrides prop.
 */
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 220,
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    overflow: 'hidden',
  },
  column: {
    flex: 1,
    height: 220,
    overflow: 'hidden',
  },
  selectionHighlight: {
    position: 'absolute',
    top: 88,
    left: 4,
    right: 4,
    height: 44,
    backgroundColor: 'rgba(120, 120, 128, 0.24)',
    borderRadius: 8,
    zIndex: 0,
  },
  itemsContainer: {
    zIndex: 1,
  },
  item: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 21,
    color: '#FFFFFF',
    fontWeight: '400',
  },
});
