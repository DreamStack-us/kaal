import type React from 'react';
import { useCallback, useMemo } from 'react';
import { StyleSheet as RNStyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

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
  const translateY = useSharedValue(-selectedIndex * ITEM_HEIGHT);
  const velocity = useSharedValue(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reanimated shared values are stable refs
  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((e) => {
          'worklet';
          translateY.value = e.translationY + -selectedIndex * ITEM_HEIGHT;
          velocity.value = e.velocityY;
        })
        .onEnd(() => {
          'worklet';
          const targetIndex = Math.round(-translateY.value / ITEM_HEIGHT);
          const clampedIndex = Math.max(
            0,
            Math.min(items.length - 1, targetIndex),
          );

          translateY.value = withSpring(-clampedIndex * ITEM_HEIGHT, {
            velocity: velocity.value,
            damping: 20,
            stiffness: 200,
          });
        }),
    [selectedIndex, items.length],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={webStyles.column}>
      <View style={webStyles.selectionHighlight} />

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[webStyles.itemsContainer, animatedStyle]}>
          <View style={{ height: ITEM_HEIGHT * 2 }} />

          {items.map((item) => (
            <View key={item.value} style={webStyles.item}>
              <Text style={webStyles.itemText}>{item.label}</Text>
            </View>
          ))}

          <View style={{ height: ITEM_HEIGHT * 2 }} />
        </Animated.View>
      </GestureDetector>
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
  itemsContainer: {
    zIndex: 1,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 21,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    fontWeight: '400',
  },
});
