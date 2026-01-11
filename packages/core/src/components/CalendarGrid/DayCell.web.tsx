/// <reference lib="dom" />
import type React from 'react';
import { memo, useMemo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useDatePickerOverrides } from '../../context/ThemeOverrideContext';

interface DayCellProps {
  date: Date | null;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isWeekend: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isInRange?: boolean;
  onPress?: () => void;
}

// Default colors (light theme for web)
const DEFAULT_COLORS = {
  cellBackground: 'transparent',
  cellSelected: '#007AFF',
  cellToday: 'rgba(0, 122, 255, 0.1)',
  cellInRange: 'rgba(0, 122, 255, 0.15)',
  textDefault: '#1C1C1E',
  textSelected: '#FFFFFF',
  textDisabled: '#8E8E93',
  textWeekend: '#8E8E93',
  textInRange: '#1C1C1E',
  primary: '#007AFF',
  cellBorderRadius: 22,
};

// Web-compatible styles (no unistyles dependency)
const webStyles = StyleSheet.create({
  cell: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
  },
});

export const DayCell: React.FC<DayCellProps> = memo(
  ({
    date,
    isSelected,
    isToday,
    isDisabled,
    isWeekend,
    isRangeStart,
    isRangeEnd,
    isInRange,
    onPress,
  }) => {
    const overrides = useDatePickerOverrides();

    // Build cell style based on state and overrides
    // Use primaryColor as fallback for cellSelectedColor (consumer expectation)
    const cellStyle = useMemo(() => {
      const style: Record<string, unknown> = {
        backgroundColor: DEFAULT_COLORS.cellBackground,
      };

      // Range start/end get selected styling
      if (isRangeStart || isRangeEnd || isSelected) {
        style.backgroundColor =
          overrides?.cellSelectedColor ??
          overrides?.primaryColor ??
          DEFAULT_COLORS.cellSelected;
        style.borderRadius =
          overrides?.cellBorderRadius ?? DEFAULT_COLORS.cellBorderRadius;
      } else if (isInRange) {
        // Dates in range get lighter background
        style.backgroundColor =
          overrides?.cellInRangeColor ?? DEFAULT_COLORS.cellInRange;
      } else if (isToday) {
        style.backgroundColor =
          overrides?.cellTodayColor ?? DEFAULT_COLORS.cellToday;
        style.borderRadius =
          overrides?.cellBorderRadius ?? DEFAULT_COLORS.cellBorderRadius;
        style.borderWidth = 1;
        style.borderColor = overrides?.primaryColor ?? DEFAULT_COLORS.primary;
      }

      if (isDisabled) {
        style.opacity = 0.4;
      }

      return style;
    }, [
      overrides,
      isSelected,
      isToday,
      isDisabled,
      isRangeStart,
      isRangeEnd,
      isInRange,
    ]);

    // Build text style based on state and overrides
    const textStyle = useMemo(() => {
      const style: Record<string, unknown> = {
        color: overrides?.textColor ?? DEFAULT_COLORS.textDefault,
        fontWeight: '400' as const,
      };

      if (isRangeStart || isRangeEnd || isSelected) {
        style.color =
          overrides?.textSelectedColor ?? DEFAULT_COLORS.textSelected;
        style.fontWeight = '600';
      } else if (isInRange) {
        style.color = overrides?.textInRangeColor ?? DEFAULT_COLORS.textInRange;
      } else if (isToday) {
        style.color = overrides?.primaryColor ?? DEFAULT_COLORS.primary;
        style.fontWeight = '600';
      } else if (isDisabled) {
        style.color =
          overrides?.textDisabledColor ?? DEFAULT_COLORS.textDisabled;
      } else if (isWeekend) {
        style.color = overrides?.textWeekendColor ?? DEFAULT_COLORS.textWeekend;
      }

      return style;
    }, [
      overrides,
      isSelected,
      isToday,
      isDisabled,
      isWeekend,
      isRangeStart,
      isRangeEnd,
      isInRange,
    ]);

    if (!date) {
      return <Pressable style={webStyles.cell} disabled />;
    }

    return (
      <Pressable
        style={[webStyles.cell, cellStyle]}
        onPress={onPress}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }).format(date)}
        accessibilityState={{ selected: isSelected, disabled: isDisabled }}
      >
        <Text style={[webStyles.text, textStyle]}>{date.getUTCDate()}</Text>
      </Pressable>
    );
  },
  (prev, next) =>
    prev.date?.getTime() === next.date?.getTime() &&
    prev.isSelected === next.isSelected &&
    prev.isToday === next.isToday &&
    prev.isDisabled === next.isDisabled &&
    prev.isRangeStart === next.isRangeStart &&
    prev.isRangeEnd === next.isRangeEnd &&
    prev.isInRange === next.isInRange,
);

DayCell.displayName = 'DayCell';
