/// <reference lib="dom" />
import type React from 'react';
import { memo, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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

const CELL_SIZE = 44;
const BAND_HEIGHT = 28; // Narrower band for thermometer effect

// Web-compatible styles (no unistyles dependency)
const webStyles = StyleSheet.create({
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Thermometer band for in-range dates
  rangeBand: {
    position: 'absolute',
    top: (CELL_SIZE - BAND_HEIGHT) / 2,
    height: BAND_HEIGHT,
    left: 0,
    right: 0,
  },
  // Half band extending right from range start
  rangeBandRight: {
    position: 'absolute',
    top: (CELL_SIZE - BAND_HEIGHT) / 2,
    height: BAND_HEIGHT,
    left: CELL_SIZE / 2,
    right: 0,
  },
  // Half band extending left to range end
  rangeBandLeft: {
    position: 'absolute',
    top: (CELL_SIZE - BAND_HEIGHT) / 2,
    height: BAND_HEIGHT,
    left: 0,
    right: CELL_SIZE / 2,
  },
  // Circle overlay for selected dates
  circleOverlay: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    zIndex: 1,
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

    const rangeColor =
      overrides?.cellInRangeColor ?? DEFAULT_COLORS.cellInRange;
    const selectedColor =
      overrides?.cellSelectedColor ??
      overrides?.primaryColor ??
      DEFAULT_COLORS.cellSelected;

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

    // Today style (non-range)
    const todayStyle = useMemo(() => {
      if (
        isToday &&
        !isSelected &&
        !isRangeStart &&
        !isRangeEnd &&
        !isInRange
      ) {
        return {
          backgroundColor:
            overrides?.cellTodayColor ?? DEFAULT_COLORS.cellToday,
          borderRadius:
            overrides?.cellBorderRadius ?? DEFAULT_COLORS.cellBorderRadius,
          borderWidth: 1,
          borderColor: overrides?.primaryColor ?? DEFAULT_COLORS.primary,
        };
      }
      return null;
    }, [isToday, isSelected, isRangeStart, isRangeEnd, isInRange, overrides]);

    if (!date) {
      return <Pressable style={webStyles.cell} disabled />;
    }

    const cellOpacity = isDisabled ? 0.4 : 1;

    return (
      <Pressable
        style={[webStyles.cell, { opacity: cellOpacity }]}
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
        {/* Thermometer band for range start (extends right) */}
        {isRangeStart && !isRangeEnd && (
          <View
            style={[webStyles.rangeBandRight, { backgroundColor: rangeColor }]}
          />
        )}

        {/* Thermometer band for range end (extends left) */}
        {isRangeEnd && !isRangeStart && (
          <View
            style={[webStyles.rangeBandLeft, { backgroundColor: rangeColor }]}
          />
        )}

        {/* Thermometer band for in-range dates (full width) */}
        {isInRange && (
          <View
            style={[webStyles.rangeBand, { backgroundColor: rangeColor }]}
          />
        )}

        {/* Circle for selected/range start/end */}
        {(isRangeStart || isRangeEnd || isSelected) && (
          <View
            style={[
              webStyles.circleOverlay,
              { backgroundColor: selectedColor },
            ]}
          />
        )}

        {/* Today indicator (when not in range) */}
        {todayStyle ? (
          <View style={[webStyles.circleOverlay, todayStyle]} />
        ) : null}

        <Text style={[webStyles.text, textStyle]}>{date.getDate()}</Text>
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
