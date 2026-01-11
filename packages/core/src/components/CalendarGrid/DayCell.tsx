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
  onPress?: () => void;
}

// Default colors (dark theme)
const DEFAULT_COLORS = {
  cellBackground: 'transparent',
  cellSelected: '#4DA6FF',
  cellToday: '#1E3A5F',
  textDefault: '#FFFFFF',
  textSelected: '#FFFFFF',
  textDisabled: '#555555',
  textWeekend: '#8E8E93',
  primary: '#4DA6FF',
  cellBorderRadius: 22,
};

const styles = StyleSheet.create({
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
  ({ date, isSelected, isToday, isDisabled, isWeekend, onPress }) => {
    const overrides = useDatePickerOverrides();

    // Build cell style based on state and overrides
    // Use primaryColor as fallback for cellSelectedColor (consumer expectation)
    const cellStyle = useMemo(() => {
      const style: Record<string, any> = {
        backgroundColor: DEFAULT_COLORS.cellBackground,
      };

      if (isSelected) {
        style.backgroundColor =
          overrides?.cellSelectedColor ??
          overrides?.primaryColor ??
          DEFAULT_COLORS.cellSelected;
        style.borderRadius = overrides?.cellBorderRadius ?? DEFAULT_COLORS.cellBorderRadius;
      } else if (isToday) {
        style.backgroundColor = overrides?.cellTodayColor ?? DEFAULT_COLORS.cellToday;
        style.borderRadius = overrides?.cellBorderRadius ?? DEFAULT_COLORS.cellBorderRadius;
        style.borderWidth = 1;
        style.borderColor = overrides?.primaryColor ?? DEFAULT_COLORS.primary;
      }

      if (isDisabled) {
        style.opacity = 0.4;
      }

      return style;
    }, [overrides, isSelected, isToday, isDisabled]);

    // Build text style based on state and overrides
    const textStyle = useMemo(() => {
      const style: Record<string, any> = {
        color: overrides?.textColor ?? DEFAULT_COLORS.textDefault,
        fontWeight: '400' as const,
      };

      if (isSelected) {
        style.color = overrides?.textSelectedColor ?? DEFAULT_COLORS.textSelected;
        style.fontWeight = '600';
      } else if (isToday) {
        style.color = overrides?.primaryColor ?? DEFAULT_COLORS.primary;
        style.fontWeight = '600';
      } else if (isDisabled) {
        style.color = overrides?.textDisabledColor ?? DEFAULT_COLORS.textDisabled;
      } else if (isWeekend) {
        style.color = overrides?.textWeekendColor ?? DEFAULT_COLORS.textWeekend;
      }

      return style;
    }, [overrides, isSelected, isToday, isDisabled, isWeekend]);

    if (!date) {
      return <Pressable style={styles.cell} disabled />;
    }

    return (
      <Pressable
        style={[styles.cell, cellStyle]}
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
        <Text style={[styles.text, textStyle]}>{date.getUTCDate()}</Text>
      </Pressable>
    );
  },
  (prev, next) =>
    prev.date?.getTime() === next.date?.getTime() &&
    prev.isSelected === next.isSelected &&
    prev.isToday === next.isToday &&
    prev.isDisabled === next.isDisabled,
);

DayCell.displayName = 'DayCell';
