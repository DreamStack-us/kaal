/// <reference lib="dom" />
import type React from 'react';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet as RNStyleSheet, Text, View } from 'react-native';
import { useTimePickerOverrides } from '../../context/ThemeOverrideContext';
import { to12Hour, to24Hour } from '../../hooks/useTimePicker';
import type { TimePeriod, TimeValue } from '../../types/timepicker';

const ITEM_HEIGHT = 44;
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
        <View
          style={[
            webStyles.selectionHighlight,
            { backgroundColor: highlightColor },
          ]}
        />

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

          {items.map((item, index) => {
            const isSelected = index === selectedIndex;
            return (
              <div
                key={`${item.value}`}
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
                <Text
                  style={[
                    webStyles.itemText,
                    { color: textColor },
                    isSelected && webStyles.itemTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </div>
            );
          })}

          {/* Bottom padding */}
          <div style={{ height: ITEM_HEIGHT * 2, flexShrink: 0 }} />
        </div>
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
          webStyles.container,
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

        <Text style={[webStyles.separator, { color: colors.separatorColor }]}>
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

const webStyles = RNStyleSheet.create({
  container: {
    flexDirection: 'row',
    height: CONTAINER_HEIGHT,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 8,
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
    borderRadius: 8,
    zIndex: 0,
  },
  itemText: {
    fontSize: 22,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    fontWeight: '400',
    opacity: 0.5,
  },
  itemTextSelected: {
    fontWeight: '500',
    opacity: 1,
  },
  separator: {
    fontSize: 22,
    fontWeight: '500',
    paddingHorizontal: 4,
  },
});
