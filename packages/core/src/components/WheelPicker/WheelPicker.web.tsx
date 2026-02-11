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
  return new Date(year, month + 1, 0).getDate();
};

const generateDateItems = (
  type: 'day' | 'month' | 'year',
  currentDate: Date,
  minDate?: Date,
  maxDate?: Date,
) => {
  if (type === 'day') {
    const daysInMonth = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth(),
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
  const minYear = minDate?.getFullYear() ?? currentDate.getFullYear() - 100;
  const maxYear = maxDate?.getFullYear() ?? currentDate.getFullYear() + 10;
  return Array.from({ length: maxYear - minYear + 1 }, (_, i) => ({
    value: minYear + i,
    label: String(minYear + i),
  }));
};

const WheelColumn: React.FC<{
  items: { value: number; label: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  label?: string;
}> = ({ items, selectedIndex, onSelect, label = 'Select value' }) => {
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

  // Keyboard navigation for spinbutton behavior (like native input[type="time"])
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newIndex = selectedIndex;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          newIndex = Math.max(0, selectedIndex - 1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          newIndex = Math.min(items.length - 1, selectedIndex + 1);
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = items.length - 1;
          break;
        case 'PageUp':
          e.preventDefault();
          newIndex = Math.max(0, selectedIndex - 5);
          break;
        case 'PageDown':
          e.preventDefault();
          newIndex = Math.min(items.length - 1, selectedIndex + 5);
          break;
        default:
          return;
      }

      if (newIndex !== selectedIndex) {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = newIndex * ITEM_HEIGHT;
        }
        onSelect(newIndex);
      }
    },
    [selectedIndex, items.length, onSelect],
  );

  const currentItem = items[selectedIndex];

  return (
    <View style={webStyles.column}>
      <View style={webStyles.selectionHighlight} />

      {/* Spinbutton container - mimics input[type="time"] accessibility */}
      <div
        ref={scrollRef}
        role="spinbutton"
        tabIndex={0}
        aria-label={label}
        aria-valuenow={currentItem?.value}
        aria-valuemin={items[0]?.value}
        aria-valuemax={items[items.length - 1]?.value}
        aria-valuetext={currentItem?.label}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const item = target.closest('[data-index]') as HTMLElement | null;
          if (item && scrollRef.current) {
            const index = Number(item.dataset.index);
            scrollRef.current.scrollTop = index * ITEM_HEIGHT;
            onSelect(index);
          }
        }}
        style={{
          height: CONTAINER_HEIGHT,
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          position: 'relative',
          zIndex: 1,
          outline: 'none',
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
            data-index={index}
            style={{
              height: ITEM_HEIGHT,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              scrollSnapAlign: 'center',
              cursor: 'pointer',
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
        const newDate = new Date(value.getFullYear(), value.getMonth(), newDay);
        onChange(newDate);
      }
    },
    [value, days, onChange],
  );

  const handleMonthChange = useCallback(
    (index: number) => {
      const newMonth = months[index]?.value;
      if (newMonth !== undefined) {
        const daysInNewMonth = getDaysInMonth(value.getFullYear(), newMonth);
        const newDay = Math.min(value.getDate(), daysInNewMonth);
        const newDate = new Date(value.getFullYear(), newMonth, newDay);
        onChange(newDate);
      }
    },
    [value, months, onChange],
  );

  const handleYearChange = useCallback(
    (index: number) => {
      const newYear = years[index]?.value;
      if (newYear !== undefined) {
        const daysInNewMonth = getDaysInMonth(newYear, value.getMonth());
        const newDay = Math.min(value.getDate(), daysInNewMonth);
        const newDate = new Date(newYear, value.getMonth(), newDay);
        onChange(newDate);
      }
    },
    [value, years, onChange],
  );

  return (
    <View style={webStyles.container}>
      <WheelColumn
        items={months}
        selectedIndex={value.getMonth()}
        onSelect={handleMonthChange}
        label="Month"
      />
      <WheelColumn
        items={days}
        selectedIndex={value.getDate() - 1}
        onSelect={handleDayChange}
        label="Day"
      />
      <WheelColumn
        items={years}
        selectedIndex={years.findIndex((y) => y.value === value.getFullYear())}
        onSelect={handleYearChange}
        label="Year"
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
