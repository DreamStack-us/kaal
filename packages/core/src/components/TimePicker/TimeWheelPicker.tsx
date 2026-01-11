import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTimePickerOverrides } from '../../context/ThemeOverrideContext';
import { to12Hour, to24Hour } from '../../hooks/useTimePicker';
import type { TimePeriod, TimeValue } from '../../types/timepicker';
import { WHEEL_ITEM_HEIGHT, styles } from './TimePicker.styles';

const ITEM_HEIGHT = WHEEL_ITEM_HEIGHT;
const VISIBLE_ITEMS = 5;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

// Default colors (dark theme)
const DEFAULT_COLORS = {
  containerBackground: '#2C2C2E',
  selectionHighlight: 'rgba(120, 120, 128, 0.24)',
  textColor: '#FFFFFF',
  separatorColor: '#FFFFFF',
};

interface WheelColumnProps {
  items: { value: number | string; label: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  textColor: string;
  highlightColor: string;
}

const WheelColumn: React.FC<WheelColumnProps> = memo(
  ({ items, selectedIndex, onSelect, textColor, highlightColor }) => {
    const translateY = useSharedValue(-selectedIndex * ITEM_HEIGHT);

    const handleSelect = useCallback(
      (index: number) => {
        onSelect(index);
      },
      [onSelect],
    );

    const panGesture = useMemo(
      () =>
        Gesture.Pan()
          .onUpdate((e) => {
            'worklet';
            translateY.value = e.translationY + -selectedIndex * ITEM_HEIGHT;
          })
          .onEnd((e) => {
            'worklet';
            const velocity = e.velocityY;
            const targetIndex = Math.round(-translateY.value / ITEM_HEIGHT);
            const clampedIndex = Math.max(
              0,
              Math.min(items.length - 1, targetIndex),
            );

            translateY.value = withSpring(-clampedIndex * ITEM_HEIGHT, {
              velocity,
              damping: 20,
              stiffness: 200,
            });

            runOnJS(handleSelect)(clampedIndex);
          }),
      [selectedIndex, items.length, handleSelect, translateY],
    );

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    return (
      <View style={styles.wheelColumn}>
        <View
          style={[
            styles.wheelSelectionIndicator,
            { backgroundColor: highlightColor },
          ]}
        />

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.wheelItemsContainer, animatedStyle]}>
            <View style={{ height: ITEM_HEIGHT * 2 }} />

            {items.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <View key={`${item.value}`} style={styles.wheelItem}>
                  <Text
                    style={[
                      styles.wheelItemText,
                      { color: textColor },
                      isSelected && styles.wheelItemTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              );
            })}

            <View style={{ height: ITEM_HEIGHT * 2 }} />
          </Animated.View>
        </GestureDetector>
      </View>
    );
  },
);

WheelColumn.displayName = 'WheelColumn';

interface TimeWheelPickerProps {
  value: TimeValue;
  onChange: (time: TimeValue) => void;
  is24Hour?: boolean;
  minuteInterval?: number;
}

export const TimeWheelPicker: React.FC<TimeWheelPickerProps> = memo(
  ({ value, onChange, is24Hour = false, minuteInterval = 1 }) => {
    const overrides = useTimePickerOverrides();

    // Build colors from overrides (use backgroundColor as fallback for wheelContainerBackground)
    const colors = useMemo(
      () => ({
        containerBackground:
          overrides?.wheelContainerBackground ??
          overrides?.backgroundColor ??
          DEFAULT_COLORS.containerBackground,
        selectionHighlight:
          overrides?.wheelSelectionHighlight ??
          DEFAULT_COLORS.selectionHighlight,
        textColor:
          overrides?.wheelTextColor ??
          overrides?.textColor ??
          DEFAULT_COLORS.textColor,
        separatorColor:
          overrides?.wheelSeparatorColor ??
          overrides?.textColor ??
          DEFAULT_COLORS.separatorColor,
      }),
      [overrides],
    );

    // Generate hour items
    const hourItems = useMemo(() => {
      if (is24Hour) {
        return Array.from({ length: 24 }, (_, i) => ({
          value: i,
          label: i.toString().padStart(2, '0'),
        }));
      }
      // 12-hour format: 1-12
      return Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: (i + 1).toString().padStart(2, '0'),
      }));
    }, [is24Hour]);

    // Generate minute items based on interval
    const minuteItems = useMemo(() => {
      const items: { value: number; label: string }[] = [];
      for (let i = 0; i < 60; i += minuteInterval) {
        items.push({
          value: i,
          label: i.toString().padStart(2, '0'),
        });
      }
      return items;
    }, [minuteInterval]);

    // Period items for 12-hour format
    const periodItems = useMemo(
      () => [
        { value: 'AM' as const, label: 'AM' },
        { value: 'PM' as const, label: 'PM' },
      ],
      [],
    );

    // Calculate selected indices
    const { hour: hour12, period } = to12Hour(value.hours);
    const hourIndex = is24Hour ? value.hours : hour12 - 1; // 12-hour is 1-indexed
    const minuteIndex = Math.floor(value.minutes / minuteInterval);
    const periodIndex = period === 'AM' ? 0 : 1;

    const handleHourChange = useCallback(
      (index: number) => {
        let newHours: number;
        if (is24Hour) {
          newHours = index;
        } else {
          const hour12 = index + 1; // Convert from 0-indexed to 1-12
          newHours = to24Hour(hour12, period);
        }
        onChange({ hours: newHours, minutes: value.minutes });
      },
      [is24Hour, period, value.minutes, onChange],
    );

    const handleMinuteChange = useCallback(
      (index: number) => {
        const newMinutes = index * minuteInterval;
        onChange({ hours: value.hours, minutes: newMinutes });
      },
      [value.hours, minuteInterval, onChange],
    );

    const handlePeriodChange = useCallback(
      (index: number) => {
        const newPeriod: TimePeriod = index === 0 ? 'AM' : 'PM';
        const newHours = to24Hour(hour12, newPeriod);
        onChange({ hours: newHours, minutes: value.minutes });
      },
      [hour12, value.minutes, onChange],
    );

    return (
      <View
        style={[
          styles.wheelContainer,
          { backgroundColor: colors.containerBackground },
        ]}
      >
        <WheelColumn
          items={hourItems}
          selectedIndex={hourIndex}
          onSelect={handleHourChange}
          textColor={colors.textColor}
          highlightColor={colors.selectionHighlight}
        />

        <Text style={[styles.wheelSeparator, { color: colors.separatorColor }]}>
          :
        </Text>

        <WheelColumn
          items={minuteItems}
          selectedIndex={minuteIndex}
          onSelect={handleMinuteChange}
          textColor={colors.textColor}
          highlightColor={colors.selectionHighlight}
        />

        {!is24Hour && (
          <WheelColumn
            items={periodItems}
            selectedIndex={periodIndex}
            onSelect={handlePeriodChange}
            textColor={colors.textColor}
            highlightColor={colors.selectionHighlight}
          />
        )}
      </View>
    );
  },
);

TimeWheelPicker.displayName = 'TimeWheelPicker';
