/// <reference lib="dom" />
import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
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
import { DayCell } from './DayCell';

interface CalendarGridProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  themeMode: 'ios' | 'android' | 'custom';
}

const CELL_SIZE = 44;
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generateMonthDays = (currentMonth: Date): (Date | null)[] => {
  const firstDay = getFirstDayOfMonth(currentMonth);
  const startOfWeek = getDayOfWeek(firstDay);
  const paddingDays = startOfWeek === 0 ? 6 : startOfWeek - 1;

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

// Web-compatible styles (no unistyles dependency)
const webStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  navText: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: '600',
  },
  monthTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
  },
});

export const CalendarGrid: React.FC<CalendarGridProps> = memo(
  ({ value, onChange, minDate, maxDate, disabledDates, themeMode }) => {
    const [currentMonth, setCurrentMonth] = React.useState(() =>
      getFirstDayOfMonth(value),
    );

    const days = useMemo(() => generateMonthDays(currentMonth), [currentMonth]);

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

    return (
      <View style={webStyles.container}>
        <View style={webStyles.header}>
          <Pressable
            onPress={() => navigateMonth(-1)}
            style={webStyles.navButton}
          >
            <Text style={webStyles.navText}>‹</Text>
          </Pressable>
          <Text style={webStyles.monthTitle}>
            {formatYearMonth(currentMonth)}
          </Text>
          <Pressable
            onPress={() => navigateMonth(1)}
            style={webStyles.navButton}
          >
            <Text style={webStyles.navText}>›</Text>
          </Pressable>
        </View>

        <View style={webStyles.weekDays}>
          {WEEK_DAYS.map((day) => (
            <Text key={day} style={webStyles.weekDayText}>
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
