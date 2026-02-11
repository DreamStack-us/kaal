import { StyleSheet } from 'react-native';

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

/**
 * Default styles for TimePicker using plain React Native StyleSheet.
 * Colors use dark theme defaults - consumers override via themeOverrides prop.
 */
export const styles = StyleSheet.create({
  // Container styles
  container: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 16,
  },

  // ============ Wheel Picker Styles (iOS) ============
  wheelContainer: {
    flexDirection: 'row',
    height: CONTAINER_HEIGHT,
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 8,
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
    backgroundColor: 'rgba(120, 120, 128, 0.24)',
    borderRadius: 8,
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
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    paddingHorizontal: 4,
  },

  // ============ Material Time Picker Styles ============
  materialContainer: {
    backgroundColor: '#2C2C2E',
    borderRadius: 28,
    padding: 24,
    width: 320,
  },

  materialHeader: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginBottom: 20,
    textTransform: 'uppercase',
  },

  // Time input display
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },

  timeFieldsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeField: {
    backgroundColor: '#3A3A3C',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    minWidth: 80,
    alignItems: 'center',
  },

  timeFieldActive: {
    backgroundColor: '#4DA6FF',
  },

  timeFieldText: {
    fontSize: 48,
    fontWeight: '400',
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
  },

  timeFieldTextActive: {
    color: '#FFFFFF',
  },

  timeSeparator: {
    fontSize: 48,
    fontWeight: '400',
    color: '#FFFFFF',
    marginHorizontal: 4,
  },

  // Period toggle (AM/PM)
  periodToggleContainer: {
    borderWidth: 1,
    borderColor: '#48484A',
    borderRadius: 8,
    overflow: 'hidden',
  },

  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },

  periodButtonActive: {
    backgroundColor: 'rgba(77, 166, 255, 0.2)',
  },

  periodButtonTop: {
    borderBottomWidth: 1,
    borderBottomColor: '#48484A',
  },

  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },

  periodButtonTextActive: {
    color: '#4DA6FF',
  },

  // ============ Clock Face Styles ============
  clockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  // ============ Action Buttons ============
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },

  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4DA6FF',
  },
});

// Export constants for use in components
export const WHEEL_ITEM_HEIGHT = ITEM_HEIGHT;
export const WHEEL_VISIBLE_ITEMS = VISIBLE_ITEMS;
export const WHEEL_CONTAINER_HEIGHT = CONTAINER_HEIGHT;
