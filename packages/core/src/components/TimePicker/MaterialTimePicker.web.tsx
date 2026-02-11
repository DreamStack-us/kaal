/// <reference lib="dom" />
import type React from 'react';
import { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTimePickerOverrides } from '../../context/ThemeOverrideContext';
import { to12Hour, to24Hour } from '../../hooks/useTimePicker';
import type { ClockMode, TimePeriod, TimeValue } from '../../types/timepicker';
import { ClockFace } from './ClockFace';

// Default colors (dark theme)
const DEFAULT_COLORS = {
  containerBackground: '#2C2C2E',
  headerColor: '#8E8E93',
  timeFieldBackground: '#3A3A3C',
  timeFieldActiveBackground: '#007AFF',
  textColor: '#FFFFFF',
  separatorColor: '#FFFFFF',
  borderColor: '#48484A',
  periodActiveBackground: 'rgba(0, 122, 255, 0.2)',
  periodTextColor: '#8E8E93',
  periodTextActiveColor: '#007AFF',
  actionButtonColor: '#007AFF',
};

interface MaterialTimePickerProps {
  value: TimeValue;
  onChange: (time: TimeValue) => void;
  is24Hour?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

// Web-compatible styles (no unistyles dependency)
const webStyles = StyleSheet.create({
  materialContainer: {
    backgroundColor: '#2C2C2E',
    borderRadius: 28,
    padding: 24,
    width: 320,
  },
  materialHeader: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  timeFieldsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeField: {
    backgroundColor: '#3A3A3C',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  timeFieldActive: {
    backgroundColor: '#007AFF',
  },
  timeFieldText: {
    fontSize: 48,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  timeFieldTextActive: {
    color: '#FFFFFF',
  },
  timeSeparator: {
    fontSize: 48,
    fontWeight: '400',
    color: '#FFFFFF',
    marginHorizontal: 4,
  },
  periodToggleContainer: {
    borderWidth: 1,
    borderColor: '#48484A',
    borderRadius: 8,
    overflow: 'hidden',
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  periodButtonActive: {
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
  },
  periodButtonTop: {
    borderBottomWidth: 1,
    borderBottomColor: '#48484A',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  periodButtonTextActive: {
    color: '#007AFF',
  },
  clockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  keyboardButton: {
    padding: 8,
  },
  keyboardButtonText: {
    fontSize: 20,
    color: '#8E8E93',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
});

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

    const displayHour = is24Hour
      ? value.hours.toString().padStart(2, '0')
      : hour12.toString().padStart(2, '0');
    const displayMinute = value.minutes.toString().padStart(2, '0');

    // Build override styles from themeOverrides
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
      <View style={[webStyles.materialContainer, containerStyle]}>
        <Text style={[webStyles.materialHeader, headerStyle]}>Select time</Text>

        <View style={webStyles.timeInputContainer}>
          <View style={webStyles.timeFieldsContainer}>
            <Pressable
              onPress={handleHourPress}
              style={[
                webStyles.timeField,
                timeFieldStyle,
                mode === 'hours' && [
                  webStyles.timeFieldActive,
                  timeFieldActiveStyle,
                ],
              ]}
            >
              <Text
                style={[
                  webStyles.timeFieldText,
                  textStyle,
                  mode === 'hours' && webStyles.timeFieldTextActive,
                ]}
              >
                {displayHour}
              </Text>
            </Pressable>

            <Text style={[webStyles.timeSeparator, separatorStyle]}>:</Text>

            <Pressable
              onPress={handleMinutePress}
              style={[
                webStyles.timeField,
                timeFieldStyle,
                mode === 'minutes' && [
                  webStyles.timeFieldActive,
                  timeFieldActiveStyle,
                ],
              ]}
            >
              <Text
                style={[
                  webStyles.timeFieldText,
                  textStyle,
                  mode === 'minutes' && webStyles.timeFieldTextActive,
                ]}
              >
                {displayMinute}
              </Text>
            </Pressable>
          </View>

          {!is24Hour && (
            <View
              style={[webStyles.periodToggleContainer, periodContainerStyle]}
            >
              <Pressable
                onPress={() => handlePeriodChange('AM')}
                style={[
                  webStyles.periodButton,
                  webStyles.periodButtonTop,
                  period === 'AM' && [
                    webStyles.periodButtonActive,
                    periodActiveStyle,
                  ],
                ]}
              >
                <Text
                  style={[
                    webStyles.periodButtonText,
                    periodTextStyle,
                    period === 'AM' && [
                      webStyles.periodButtonTextActive,
                      periodTextActiveStyle,
                    ],
                  ]}
                >
                  AM
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handlePeriodChange('PM')}
                style={[
                  webStyles.periodButton,
                  period === 'PM' && [
                    webStyles.periodButtonActive,
                    periodActiveStyle,
                  ],
                ]}
              >
                <Text
                  style={[
                    webStyles.periodButtonText,
                    periodTextStyle,
                    period === 'PM' && [
                      webStyles.periodButtonTextActive,
                      periodTextActiveStyle,
                    ],
                  ]}
                >
                  PM
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        <ClockFace
          value={value}
          onChange={onChange}
          mode={mode}
          onModeChange={handleModeChange}
          is24Hour={is24Hour}
        />

        <View style={webStyles.actionsContainer}>
          <Pressable style={webStyles.keyboardButton}>
            <Text style={webStyles.keyboardButtonText}>⌨️</Text>
          </Pressable>

          <View style={webStyles.actionButtonsContainer}>
            {onCancel && (
              <Pressable style={webStyles.actionButton} onPress={onCancel}>
                <Text
                  style={[webStyles.actionButtonText, actionButtonTextStyle]}
                >
                  Cancel
                </Text>
              </Pressable>
            )}
            {onConfirm && (
              <Pressable style={webStyles.actionButton} onPress={onConfirm}>
                <Text
                  style={[webStyles.actionButtonText, actionButtonTextStyle]}
                >
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
