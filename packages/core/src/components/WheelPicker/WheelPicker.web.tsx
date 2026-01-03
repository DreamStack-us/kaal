import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet as RNStyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { Temporal } from '@js-temporal/polyfill';

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

interface WheelPickerProps {
  value: Temporal.PlainDate;
  onChange: (date: Temporal.PlainDate) => void;
  minDate?: Temporal.PlainDate;
  maxDate?: Temporal.PlainDate;
}

const generateDateItems = (
  type: 'day' | 'month' | 'year',
  currentDate: Temporal.PlainDate,
  minDate?: Temporal.PlainDate,
  maxDate?: Temporal.PlainDate
) => {
  if (type === 'day') {
    return Array.from({ length: currentDate.daysInMonth }, (_, i) => ({
      value: i + 1,
      label: String(i + 1).padStart(2, '0'),
    }));
  }
  if (type === 'month') {
    return Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      label: new Date(2000, i).toLocaleString('en-US', { month: 'short' }),
    }));
  }
  const minYear = minDate?.year ?? currentDate.year - 100;
  const maxYear = maxDate?.year ?? currentDate.year + 10;
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
          const clampedIndex = Math.max(0, Math.min(items.length - 1, targetIndex));

          translateY.value = withSpring(-clampedIndex * ITEM_HEIGHT, {
            velocity: velocity.value,
            damping: 20,
            stiffness: 200,
          });
        }),
    [selectedIndex, items.length]
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
    [value.year, value.month]
  );
  const months = useMemo(
    () => generateDateItems('month', value),
    []
  );
  const years = useMemo(
    () => generateDateItems('year', value, minDate, maxDate),
    [minDate, maxDate]
  );

  const handleDayChange = useCallback(
    (index: number) => {
      const newDay = days[index].value;
      onChange(value.with({ day: newDay }));
    },
    [value, days, onChange]
  );

  const handleMonthChange = useCallback(
    (index: number) => {
      const newMonth = months[index].value;
      onChange(value.with({ month: newMonth }));
    },
    [value, onChange]
  );

  const handleYearChange = useCallback(
    (index: number) => {
      const newYear = years[index].value;
      onChange(value.with({ year: newYear }));
    },
    [value, years, onChange]
  );

  return (
    <View style={webStyles.container}>
      <WheelColumn
        items={months}
        selectedIndex={value.month - 1}
        onSelect={handleMonthChange}
      />
      <WheelColumn
        items={days}
        selectedIndex={value.day - 1}
        onSelect={handleDayChange}
      />
      <WheelColumn
        items={years}
        selectedIndex={years.findIndex((y) => y.value === value.year)}
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
