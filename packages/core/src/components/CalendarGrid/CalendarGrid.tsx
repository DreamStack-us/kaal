import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
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
}

const CELL_SIZE = 44;
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generateMonthDays = (currentMonth: Date): (Date | null)[] => {
  const firstDay = getFirstDayOfMonth(currentMonth);
  // getDayOfWeek returns 0 for Sunday, we want Monday = 0
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigateMonth(-1)} style={styles.navButton}>
            <Text style={styles.navText}>‹</Text>
          </Pressable>
          <Text style={styles.monthTitle}>{formatYearMonth(currentMonth)}</Text>
          <Pressable onPress={() => navigateMonth(1)} style={styles.navButton}>
            <Text style={styles.navText}>›</Text>
          </Pressable>
        </View>

        <View style={styles.weekDays}>
          {WEEK_DAYS.map((day) => (
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
