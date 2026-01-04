import { Temporal } from '@js-temporal/polyfill';
import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { styles } from './CalendarGrid.styles';
import { DayCell } from './DayCell';

interface CalendarGridProps {
  value: Temporal.PlainDate;
  onChange: (date: Temporal.PlainDate) => void;
  minDate?: Temporal.PlainDate;
  maxDate?: Temporal.PlainDate;
  disabledDates?: Temporal.PlainDate[];
  themeMode: 'ios' | 'android' | 'custom';
}

const CELL_SIZE = 44;
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generateMonthDays = (
  yearMonth: Temporal.PlainYearMonth,
): (Temporal.PlainDate | null)[] => {
  const firstDay = yearMonth.toPlainDate({ day: 1 });
  const daysInMonth = yearMonth.daysInMonth;
  const startOfWeek = firstDay.dayOfWeek;
  const paddingDays = startOfWeek - 1;

  const days: (Temporal.PlainDate | null)[] = [];

  for (let i = 0; i < paddingDays; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(yearMonth.toPlainDate({ day }));
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
      Temporal.PlainYearMonth.from(value),
    );

    const days = useMemo(() => generateMonthDays(currentMonth), [currentMonth]);

    const today = useMemo(() => Temporal.Now.plainDateISO(), []);

    const isDisabled = useCallback(
      (date: Temporal.PlainDate | null): boolean => {
        if (!date) return true;
        if (minDate && Temporal.PlainDate.compare(date, minDate) < 0)
          return true;
        if (maxDate && Temporal.PlainDate.compare(date, maxDate) > 0)
          return true;
        if (disabledDates?.some((d) => date.equals(d))) return true;
        return false;
      },
      [minDate, maxDate, disabledDates],
    );

    const navigateMonth = useCallback((direction: 1 | -1) => {
      setCurrentMonth((prev) => prev.add({ months: direction }));
    }, []);

    const renderDay = useCallback(
      ({ item, index }: { item: Temporal.PlainDate | null; index: number }) => (
        <DayCell
          date={item}
          isSelected={item?.equals(value) ?? false}
          isToday={item?.equals(today) ?? false}
          isDisabled={isDisabled(item)}
          isWeekend={item ? item.dayOfWeek >= 6 : false}
          onPress={item && !isDisabled(item) ? () => onChange(item) : undefined}
        />
      ),
      [value, today, isDisabled, onChange],
    );

    const keyExtractor = useCallback(
      (item: Temporal.PlainDate | null, index: number) =>
        item?.toString() ?? `empty-${index}`,
      [],
    );

    const getItemLayout = useCallback(
      (
        _data: ArrayLike<Temporal.PlainDate | null> | null | undefined,
        index: number,
      ) => ({
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
          <Text style={styles.monthTitle}>
            {currentMonth.toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </Text>
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
