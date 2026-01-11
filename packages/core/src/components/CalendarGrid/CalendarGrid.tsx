import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useDatePickerOverrides } from '../../context/ThemeOverrideContext';
import {
  addMonths,
  compareDates,
  formatYearMonth,
  getDayOfWeek,
  getFirstDayOfMonth,
  getMonthDays,
  isSameDay,
  today,
} from '../../utils/date';
import { styles } from './CalendarGrid.styles';
import { DayCell } from './DayCell';

interface CalendarGridProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  themeMode: 'ios' | 'android' | 'custom';
  /**
   * First day of the week: 0 = Sunday, 1 = Monday
   * @default 0 (Sunday)
   *
   * TODO: This is a temporary solution. In the future, we need to add full
   * locale support to handle different calendar formats, layouts, and
   * localized day/month names across different regions.
   */
  weekStartsOn?: 0 | 1;
}

const CELL_SIZE = 44;

// Week day labels starting from Sunday
const WEEK_DAYS_SUNDAY_START = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];
const WEEK_DAYS_MONDAY_START = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
];

/**
 * Generate padding days for the month grid based on week start day
 * TODO: This logic should be refactored when adding locale support
 */
const generateMonthDays = (
  currentMonth: Date,
  weekStartsOn: 0 | 1,
): (Date | null)[] => {
  const firstDay = getFirstDayOfMonth(currentMonth);
  // getDayOfWeek returns 0 for Sunday, 1 for Monday, etc.
  const dayOfWeek = getDayOfWeek(firstDay);

  // Calculate padding days based on week start
  let paddingDays: number;
  if (weekStartsOn === 0) {
    // Sunday start: Sunday = 0 padding, Monday = 1, etc.
    paddingDays = dayOfWeek;
  } else {
    // Monday start: Monday = 0 padding, Sunday = 6 padding
    paddingDays = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  }

  const days: (Date | null)[] = [];

  for (let i = 0; i < paddingDays; i++) {
    days.push(null);
  }

  const monthDays = getMonthDays(
    currentMonth.getUTCFullYear(),
    currentMonth.getUTCMonth(),
  );
  for (const day of monthDays) {
    days.push(day);
  }

  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let i = 0; i < remaining; i++) {
      days.push(null);
    }
  }

  return days;
};

export const CalendarGrid: React.FC<CalendarGridProps> = memo(
  ({
    value,
    onChange,
    minDate,
    maxDate,
    disabledDates,
    themeMode,
    weekStartsOn = 0,
  }) => {
    const overrides = useDatePickerOverrides();
    const [currentMonth, setCurrentMonth] = React.useState(() =>
      getFirstDayOfMonth(value),
    );

    const days = useMemo(
      () => generateMonthDays(currentMonth, weekStartsOn),
      [currentMonth, weekStartsOn],
    );

    const weekDays =
      weekStartsOn === 0 ? WEEK_DAYS_SUNDAY_START : WEEK_DAYS_MONDAY_START;

    const todayDate = useMemo(() => today(), []);

    const isDisabled = useCallback(
      (date: Date | null): boolean => {
        if (!date) return true;
        if (minDate && compareDates(date, minDate) < 0) return true;
        if (maxDate && compareDates(date, maxDate) > 0) return true;
        if (disabledDates?.some((d) => isSameDay(date, d))) return true;
        return false;
      },
      [minDate, maxDate, disabledDates],
    );

    const navigateMonth = useCallback((direction: 1 | -1) => {
      setCurrentMonth((prev) => addMonths(prev, direction));
    }, []);

    const renderDay = useCallback(
      ({ item }: { item: Date | null }) => (
        <DayCell
          date={item}
          isSelected={item ? isSameDay(item, value) : false}
          isToday={item ? isSameDay(item, todayDate) : false}
          isDisabled={isDisabled(item)}
          isWeekend={
            item ? getDayOfWeek(item) === 0 || getDayOfWeek(item) === 6 : false
          }
          onPress={item && !isDisabled(item) ? () => onChange(item) : undefined}
        />
      ),
      [value, todayDate, isDisabled, onChange],
    );

    const keyExtractor = useCallback(
      (item: Date | null, index: number) =>
        item?.toISOString() ?? `empty-${index}`,
      [],
    );

    const getItemLayout = useCallback(
      (_data: ArrayLike<Date | null> | null | undefined, index: number) => ({
        length: CELL_SIZE,
        offset: CELL_SIZE * Math.floor(index / 7),
        index,
      }),
      [],
    );

    // Build override styles from themeOverrides
    const containerStyle = useMemo(
      () => ({
        backgroundColor: overrides?.backgroundColor ?? '#1E1E1E',
        borderRadius: overrides?.borderRadius ?? 16,
        padding: overrides?.padding ?? 16,
      }),
      [overrides],
    );

    const navTextStyle = useMemo(
      () => ({
        color: overrides?.primaryColor ?? '#4DA6FF',
      }),
      [overrides],
    );

    const monthTitleStyle = useMemo(
      () => ({
        color: overrides?.textColor ?? '#FFFFFF',
      }),
      [overrides],
    );

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.header}>
          <Pressable onPress={() => navigateMonth(-1)} style={styles.navButton}>
            <Text style={[styles.navText, navTextStyle]}>‹</Text>
          </Pressable>
          <Text style={[styles.monthTitle, monthTitleStyle]}>
            {formatYearMonth(currentMonth)}
          </Text>
          <Pressable onPress={() => navigateMonth(1)} style={styles.navButton}>
            <Text style={[styles.navText, navTextStyle]}>›</Text>
          </Pressable>
        </View>

        <View style={styles.weekDays}>
          {weekDays.map((day) => (
            <Text key={day} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        <FlatList
          data={days}
          renderItem={renderDay}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          numColumns={7}
          scrollEnabled={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={14}
          windowSize={3}
          initialNumToRender={42}
        />
      </View>
    );
  },
);

CalendarGrid.displayName = 'CalendarGrid';
