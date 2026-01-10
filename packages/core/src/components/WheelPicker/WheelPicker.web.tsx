/// <reference lib="dom" />
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet as RNStyleSheet, Text, View } from 'react-native';

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

interface WheelPickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
};

const generateDateItems = (
  type: 'day' | 'month' | 'year',
  currentDate: Date,
  minDate?: Date,
  maxDate?: Date,
) => {
  if (type === 'day') {
    const daysInMonth = getDaysInMonth(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
    );
    return Array.from({ length: daysInMonth }, (_, i) => ({
      value: i + 1,
      label: String(i + 1).padStart(2, '0'),
    }));
  }
  if (type === 'month') {
    return Array.from({ length: 12 }, (_, i) => ({
      value: i,
      label: new Date(2000, i).toLocaleString('en-US', { month: 'short' }),
    }));
  }
  const minYear =
    minDate?.getUTCFullYear() ?? currentDate.getUTCFullYear() - 100;
  const maxYear =
    maxDate?.getUTCFullYear() ?? currentDate.getUTCFullYear() + 10;
  return Array.from({ length: maxYear - minYear + 1 }, (_, i) => ({
    value: minYear + i,
    label: String(minYear + i),
  }));
};

const WheelColumn: React.FC<{
  items: { value: number; label: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}> = ({ items, selectedIndex, onSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Scroll to selected item on mount and when selection changes externally
  useEffect(() => {
    if (scrollRef.current && !isScrolling.current) {
      scrollRef.current.scrollTop = selectedIndex * ITEM_HEIGHT;
    }
  }, [selectedIndex]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    isScrolling.current = true;

    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Debounce scroll end detection
    scrollTimeout.current = setTimeout(() => {
      if (!scrollRef.current) return;

      const scrollTop = scrollRef.current.scrollTop;
      const newIndex = Math.round(scrollTop / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, newIndex));

      // Snap to nearest item
      scrollRef.current.scrollTop = clampedIndex * ITEM_HEIGHT;

      if (clampedIndex !== selectedIndex) {
        onSelect(clampedIndex);
      }

      isScrolling.current = false;
    }, 100);
  }, [items.length, selectedIndex, onSelect]);

  return (
    <View style={webStyles.column}>
      <View style={webStyles.selectionHighlight} />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          height: CONTAINER_HEIGHT,
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          position: 'relative',
          zIndex: 1,
          // Hide scrollbar
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* @ts-ignore - webkit scrollbar hiding */}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Top padding */}
        <div style={{ height: ITEM_HEIGHT * 2, flexShrink: 0 }} />

        {items.map((item, index) => (
          <div
            key={item.value}
            style={{
              height: ITEM_HEIGHT,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              scrollSnapAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTop = index * ITEM_HEIGHT;
              }
              onSelect(index);
            }}
          >
            <Text style={webStyles.itemText}>{item.label}</Text>
          </div>
        ))}

        {/* Bottom padding */}
        <div style={{ height: ITEM_HEIGHT * 2, flexShrink: 0 }} />
      </div>
    </View>
  );
};

export const WheelPicker: React.FC<WheelPickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
}) => {
  const days = useMemo(
    () => generateDateItems('day', value, minDate, maxDate),
    [value, minDate, maxDate],
  );
  const months = useMemo(() => generateDateItems('month', value), [value]);
  const years = useMemo(
    () => generateDateItems('year', value, minDate, maxDate),
    [value, minDate, maxDate],
  );

  const handleDayChange = useCallback(
    (index: number) => {
      const newDay = days[index]?.value;
      if (newDay !== undefined) {
        const newDate = new Date(
          Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), newDay),
        );
        onChange(newDate);
      }
    },
    [value, days, onChange],
  );

  const handleMonthChange = useCallback(
    (index: number) => {
      const newMonth = months[index]?.value;
      if (newMonth !== undefined) {
        const daysInNewMonth = getDaysInMonth(value.getUTCFullYear(), newMonth);
        const newDay = Math.min(value.getUTCDate(), daysInNewMonth);
        const newDate = new Date(
          Date.UTC(value.getUTCFullYear(), newMonth, newDay),
        );
        onChange(newDate);
      }
    },
    [value, months, onChange],
  );

  const handleYearChange = useCallback(
    (index: number) => {
      const newYear = years[index]?.value;
      if (newYear !== undefined) {
        const daysInNewMonth = getDaysInMonth(newYear, value.getUTCMonth());
        const newDay = Math.min(value.getUTCDate(), daysInNewMonth);
        const newDate = new Date(
          Date.UTC(newYear, value.getUTCMonth(), newDay),
        );
        onChange(newDate);
      }
    },
    [value, years, onChange],
  );

  return (
    <View style={webStyles.container}>
      <WheelColumn
        items={months}
        selectedIndex={value.getUTCMonth()}
        onSelect={handleMonthChange}
      />
      <WheelColumn
        items={days}
        selectedIndex={value.getUTCDate() - 1}
        onSelect={handleDayChange}
      />
      <WheelColumn
        items={years}
        selectedIndex={years.findIndex(
          (y) => y.value === value.getUTCFullYear(),
        )}
        onSelect={handleYearChange}
      />
    </View>
  );
};

const webStyles = RNStyleSheet.create({
  container: {
    flexDirection: 'row',
    height: CONTAINER_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    // @ts-ignore - web-only property
    backdropFilter: 'blur(20px)',
    borderRadius: 14,
    overflow: 'hidden',
  },
  column: {
    flex: 1,
    height: CONTAINER_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
  },
  selectionHighlight: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 4,
    right: 4,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: 8,
    zIndex: 0,
  },
  itemText: {
    fontSize: 21,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    fontWeight: '400',
  },
});
