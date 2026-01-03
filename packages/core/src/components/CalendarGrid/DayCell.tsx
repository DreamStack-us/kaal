import React, { memo } from 'react';
import { Pressable, Text } from 'react-native';
import type { Temporal } from '@js-temporal/polyfill';
import { StyleSheet } from 'react-native-unistyles';

interface DayCellProps {
  date: Temporal.PlainDate | null;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isWeekend: boolean;
  onPress?: () => void;
}

const styles = StyleSheet.create((theme) => ({
  cell: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    variants: {
      state: {
        default: {
          backgroundColor: theme.colors.datepicker.cellBackground,
        },
        selected: {
          backgroundColor: theme.colors.datepicker.cellSelected,
          borderRadius: theme.radii.cell,
        },
        today: {
          backgroundColor: theme.colors.datepicker.cellToday,
          borderRadius: theme.radii.cell,
          borderWidth: 1,
          borderColor: theme.colors.primary.default,
        },
        disabled: {
          opacity: 0.4,
        },
      },
    },
  },
  text: {
    fontSize: theme.typography.dayCell.fontSize,
    fontWeight: theme.typography.dayCell.fontWeight,
    variants: {
      state: {
        default: {
          color: theme.colors.datepicker.textDefault,
        },
        selected: {
          color: theme.colors.datepicker.textSelected,
          fontWeight: '600',
        },
        today: {
          color: theme.colors.primary.default,
          fontWeight: '600',
        },
        disabled: {
          color: theme.colors.datepicker.textDisabled,
        },
        weekend: {
          color: theme.colors.datepicker.textWeekend,
        },
      },
    },
  },
}));

export const DayCell: React.FC<DayCellProps> = memo(
  ({ date, isSelected, isToday, isDisabled, isWeekend, onPress }) => {
    if (!date) {
      return <Pressable style={styles.cell} disabled />;
    }

    const state = isDisabled
      ? 'disabled'
      : isSelected
      ? 'selected'
      : isToday
      ? 'today'
      : isWeekend
      ? 'weekend'
      : 'default';

    styles.useVariants({ state });

    return (
      <Pressable
        style={styles.cell}
        onPress={onPress}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={date.toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
        accessibilityState={{ selected: isSelected, disabled: isDisabled }}
      >
        <Text style={styles.text}>{date.day}</Text>
      </Pressable>
    );
  },
  (prev, next) =>
    prev.date?.toString() === next.date?.toString() &&
    prev.isSelected === next.isSelected &&
    prev.isToday === next.isToday &&
    prev.isDisabled === next.isDisabled
);

DayCell.displayName = 'DayCell';
