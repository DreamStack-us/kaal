import { StyleSheet } from 'react-native-unistyles';

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

export const styles = StyleSheet.create((theme) => ({
  // Container styles
  container: {
    backgroundColor: theme.colors.background.elevated,
    borderRadius: theme.radii.card,
    padding: theme.spacing(4),
  },

  // ============ Wheel Picker Styles (iOS) ============
  wheelContainer: {
    flexDirection: 'row',
    height: CONTAINER_HEIGHT,
    backgroundColor: theme.colors.background.elevated,
    // @ts-ignore - web-only property
    backdropFilter: 'blur(20px)',
    borderRadius: theme.radii.card,
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: theme.spacing(2),
  },

  wheelColumn: {
    flex: 1,
    height: CONTAINER_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
  },

  wheelSelectionIndicator: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 4,
    right: 4,
    height: ITEM_HEIGHT,
    backgroundColor: theme.colors.datepicker.wheelHighlight,
    borderRadius: theme.radii.button,
    zIndex: 0,
  },

  wheelItemsContainer: {
    zIndex: 1,
  },

  wheelItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wheelItemText: {
    fontSize: 22,
    color: theme.colors.foreground.default,
    fontWeight: '400',
    opacity: 0.5,
  },

  wheelItemTextSelected: {
    fontWeight: '500',
    opacity: 1,
  },

  wheelSeparator: {
    fontSize: 22,
    fontWeight: '500',
    color: theme.colors.foreground.default,
    paddingHorizontal: theme.spacing(1),
  },

  // ============ Material Time Picker Styles ============
  materialContainer: {
    backgroundColor: theme.colors.background.subtle,
    borderRadius: 28,
    padding: theme.spacing(6),
    width: 320,
  },

  materialHeader: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.foreground.muted,
    letterSpacing: 0.5,
    marginBottom: theme.spacing(5),
    textTransform: 'uppercase',
  },

  // Time input display
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(6),
  },

  timeFieldsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeField: {
    backgroundColor: theme.colors.background.elevated,
    borderRadius: theme.radii.button,
    paddingVertical: theme.spacing(3),
    paddingHorizontal: theme.spacing(2),
    minWidth: 80,
    alignItems: 'center',
  },

  timeFieldActive: {
    backgroundColor: theme.colors.primary.default,
  },

  timeFieldText: {
    fontSize: 48,
    fontWeight: '400',
    color: theme.colors.foreground.default,
    fontVariant: ['tabular-nums'],
  },

  timeFieldTextActive: {
    color: '#FFFFFF',
  },

  timeSeparator: {
    fontSize: 48,
    fontWeight: '400',
    color: theme.colors.foreground.default,
    marginHorizontal: theme.spacing(1),
  },

  // Period toggle (AM/PM)
  periodToggleContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border.strong,
    borderRadius: theme.radii.button,
    overflow: 'hidden',
  },

  periodButton: {
    paddingVertical: theme.spacing(2),
    paddingHorizontal: theme.spacing(3),
    backgroundColor: 'transparent',
  },

  periodButtonActive: {
    backgroundColor: `${theme.colors.primary.default}20`, // 20% opacity
  },

  periodButtonTop: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.strong,
  },

  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.foreground.muted,
  },

  periodButtonTextActive: {
    color: theme.colors.primary.default,
  },

  // ============ Clock Face Styles ============
  clockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(5),
  },

  // ============ Action Buttons ============
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  keyboardButton: {
    padding: theme.spacing(2),
  },

  keyboardButtonText: {
    fontSize: 20,
    color: theme.colors.foreground.muted,
  },

  actionButtonsContainer: {
    flexDirection: 'row',
    gap: theme.spacing(2),
  },

  actionButton: {
    paddingVertical: theme.spacing(2.5),
    paddingHorizontal: theme.spacing(4),
    borderRadius: 20,
  },

  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.primary.default,
  },
}));
