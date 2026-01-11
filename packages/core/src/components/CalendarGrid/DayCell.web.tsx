/// <reference lib="dom" />
import type React from 'react';
import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface DayCellProps {
  date: Date | null;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isWeekend: boolean;
  onPress?: () => void;
}

// Web-compatible styles (no unistyles dependency)
const webStyles = StyleSheet.create({
  cell: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  cellSelected: {
    backgroundColor: '#007AFF',
    borderRadius: 22,
  },
  cellToday: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  cellDisabled: {
    opacity: 0.4,
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    color: '#1C1C1E',
  },
  textSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  textToday: {
    color: '#007AFF',
    fontWeight: '600',
  },
  textDisabled: {
    color: '#8E8E93',
  },
  textWeekend: {
    color: '#8E8E93',
  },
});

export const DayCell: React.FC<DayCellProps> = memo(
  ({ date, isSelected, isToday, isDisabled, isWeekend, onPress }) => {
    if (!date) {
      return <Pressable style={webStyles.cell} disabled />;
    }

    const cellStyle = [
      webStyles.cell,
      isSelected && webStyles.cellSelected,
      isToday && !isSelected && webStyles.cellToday,
      isDisabled && webStyles.cellDisabled,
    ];

    const textStyle = [
      webStyles.text,
      isSelected && webStyles.textSelected,
      isToday && !isSelected && webStyles.textToday,
      isDisabled && webStyles.textDisabled,
      isWeekend && !isSelected && !isToday && webStyles.textWeekend,
    ];

    return (
      <Pressable
        style={cellStyle}
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
        <Text style={textStyle}>{date.getUTCDate()}</Text>
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
