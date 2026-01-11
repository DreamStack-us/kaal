import type React from 'react';
import { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTimePickerOverrides } from '../../context/ThemeOverrideContext';
import { to12Hour, to24Hour } from '../../hooks/useTimePicker';
import type { ClockMode, TimePeriod, TimeValue } from '../../types/timepicker';
import { ClockFace } from './ClockFace';
import { styles } from './TimePicker.styles';

// Default colors (dark theme)
const DEFAULT_COLORS = {
  containerBackground: '#2C2C2E',
  headerColor: '#8E8E93',
  timeFieldBackground: '#3A3A3C',
  timeFieldActiveBackground: '#4DA6FF',
  textColor: '#FFFFFF',
  separatorColor: '#FFFFFF',
  borderColor: '#48484A',
  periodActiveBackground: 'rgba(77, 166, 255, 0.2)',
  periodTextColor: '#8E8E93',
  periodTextActiveColor: '#4DA6FF',
  actionButtonColor: '#4DA6FF',
};

interface MaterialTimePickerProps {
  value: TimeValue;
  onChange: (time: TimeValue) => void;
  is24Hour?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const MaterialTimePicker: React.FC<MaterialTimePickerProps> = memo(
  ({ value, onChange, is24Hour = false, onCancel, onConfirm }) => {
    const overrides = useTimePickerOverrides();
    const [mode, setMode] = useState<ClockMode>('hours');
    const { hour: hour12, period } = to12Hour(value.hours);

    const handleHourPress = useCallback(() => {
      setMode('hours');
    }, []);

    const handleMinutePress = useCallback(() => {
      setMode('minutes');
    }, []);

    const handlePeriodChange = useCallback(
      (newPeriod: TimePeriod) => {
        const newHours = to24Hour(hour12, newPeriod);
        onChange({ hours: newHours, minutes: value.minutes });
      },
      [hour12, value.minutes, onChange],
    );

    const handleModeChange = useCallback((newMode: ClockMode) => {
      setMode(newMode);
    }, []);

    // Format display values
    const displayHour = is24Hour
      ? value.hours.toString().padStart(2, '0')
      : hour12.toString().padStart(2, '0');
    const displayMinute = value.minutes.toString().padStart(2, '0');

    // Build override styles
    const containerStyle = useMemo(
      () => ({
        backgroundColor:
          overrides?.containerBackground ?? DEFAULT_COLORS.containerBackground,
      }),
      [overrides],
    );

    const headerStyle = useMemo(
      () => ({
        color: overrides?.headerColor ?? DEFAULT_COLORS.headerColor,
      }),
      [overrides],
    );

    const timeFieldStyle = useMemo(
      () => ({
        backgroundColor:
          overrides?.timeFieldBackground ?? DEFAULT_COLORS.timeFieldBackground,
      }),
      [overrides],
    );

    const timeFieldActiveStyle = useMemo(
      () => ({
        backgroundColor:
          overrides?.timeFieldActiveBackground ??
          DEFAULT_COLORS.timeFieldActiveBackground,
      }),
      [overrides],
    );

    const textStyle = useMemo(
      () => ({
        color: overrides?.textColor ?? DEFAULT_COLORS.textColor,
      }),
      [overrides],
    );

    const separatorStyle = useMemo(
      () => ({
        color: overrides?.separatorColor ?? DEFAULT_COLORS.separatorColor,
      }),
      [overrides],
    );

    const periodContainerStyle = useMemo(
      () => ({
        borderColor: overrides?.periodBorderColor ?? DEFAULT_COLORS.borderColor,
      }),
      [overrides],
    );

    const periodActiveStyle = useMemo(
      () => ({
        backgroundColor:
          overrides?.periodActiveBackground ??
          DEFAULT_COLORS.periodActiveBackground,
      }),
      [overrides],
    );

    const periodTextStyle = useMemo(
      () => ({
        color: overrides?.periodTextColor ?? DEFAULT_COLORS.periodTextColor,
      }),
      [overrides],
    );

    const periodTextActiveStyle = useMemo(
      () => ({
        color:
          overrides?.periodTextActiveColor ??
          DEFAULT_COLORS.periodTextActiveColor,
      }),
      [overrides],
    );

    const actionButtonTextStyle = useMemo(
      () => ({
        color: overrides?.actionButtonColor ?? DEFAULT_COLORS.actionButtonColor,
      }),
      [overrides],
    );

    return (
      <View style={[styles.materialContainer, containerStyle]}>
        {/* Header */}
        <Text style={[styles.materialHeader, headerStyle]}>Select time</Text>

        {/* Time Input Display */}
        <View style={styles.timeInputContainer}>
          <View style={styles.timeFieldsContainer}>
            {/* Hour Field */}
            <Pressable
              onPress={handleHourPress}
              style={[
                styles.timeField,
                timeFieldStyle,
                mode === 'hours' && [styles.timeFieldActive, timeFieldActiveStyle],
              ]}
            >
              <Text
                style={[
                  styles.timeFieldText,
                  textStyle,
                  mode === 'hours' && styles.timeFieldTextActive,
                ]}
              >
                {displayHour}
              </Text>
            </Pressable>

            {/* Separator */}
            <Text style={[styles.timeSeparator, separatorStyle]}>:</Text>

            {/* Minute Field */}
            <Pressable
              onPress={handleMinutePress}
              style={[
                styles.timeField,
                timeFieldStyle,
                mode === 'minutes' && [styles.timeFieldActive, timeFieldActiveStyle],
              ]}
            >
              <Text
                style={[
                  styles.timeFieldText,
                  textStyle,
                  mode === 'minutes' && styles.timeFieldTextActive,
                ]}
              >
                {displayMinute}
              </Text>
            </Pressable>
          </View>

          {/* AM/PM Toggle (only for 12-hour format) */}
          {!is24Hour && (
            <View style={[styles.periodToggleContainer, periodContainerStyle]}>
              <Pressable
                onPress={() => handlePeriodChange('AM')}
                style={[
                  styles.periodButton,
                  styles.periodButtonTop,
                  period === 'AM' && [styles.periodButtonActive, periodActiveStyle],
                ]}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    periodTextStyle,
                    period === 'AM' && [styles.periodButtonTextActive, periodTextActiveStyle],
                  ]}
                >
                  AM
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handlePeriodChange('PM')}
                style={[
                  styles.periodButton,
                  period === 'PM' && [styles.periodButtonActive, periodActiveStyle],
                ]}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    periodTextStyle,
                    period === 'PM' && [styles.periodButtonTextActive, periodTextActiveStyle],
                  ]}
                >
                  PM
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Clock Face */}
        <ClockFace
          value={value}
          onChange={onChange}
          mode={mode}
          onModeChange={handleModeChange}
          is24Hour={is24Hour}
        />

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <Pressable style={styles.keyboardButton}>
            <Text style={styles.keyboardButtonText}>⌨️</Text>
          </Pressable>

          <View style={styles.actionButtonsContainer}>
            {onCancel && (
              <Pressable style={styles.actionButton} onPress={onCancel}>
                <Text style={[styles.actionButtonText, actionButtonTextStyle]}>
                  Cancel
                </Text>
              </Pressable>
            )}
            {onConfirm && (
              <Pressable style={styles.actionButton} onPress={onConfirm}>
                <Text style={[styles.actionButtonText, actionButtonTextStyle]}>
                  OK
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  },
);

MaterialTimePicker.displayName = 'MaterialTimePicker';
