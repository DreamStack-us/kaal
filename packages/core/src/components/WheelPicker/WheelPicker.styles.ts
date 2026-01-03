import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    height: 220,
    backgroundColor: theme.colors.background.elevated,
    borderRadius: theme.radii.card,
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
    backgroundColor: theme.colors.datepicker.wheelHighlight,
    borderRadius: theme.radii.button,
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
    color: theme.colors.foreground.default,
    fontWeight: '400',
  },
}));
