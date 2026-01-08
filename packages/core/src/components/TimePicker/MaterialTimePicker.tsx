import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { to12Hour, to24Hour } from '../../hooks/useTimePicker';
import type { ClockMode, TimePeriod, TimeValue } from '../../types/timepicker';
import { ClockFace } from './ClockFace';
import { styles } from './TimePicker.styles';

interface MaterialTimePickerProps {
  value: TimeValue;
  onChange: (time: TimeValue) => void;
  is24Hour?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const MaterialTimePicker: React.FC<MaterialTimePickerProps> = memo(
  ({ value, onChange, is24Hour = false, onCancel, onConfirm }) => {
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

    return (
      <View style={styles.materialContainer}>
        {/* Header */}
        <Text style={styles.materialHeader}>Select time</Text>

        {/* Time Input Display */}
        <View style={styles.timeInputContainer}>
          <View style={styles.timeFieldsContainer}>
            {/* Hour Field */}
            <Pressable
              onPress={handleHourPress}
              style={[
                styles.timeField,
                mode === 'hours' && styles.timeFieldActive,
              ]}
            >
              <Text
                style={[
                  styles.timeFieldText,
                  mode === 'hours' && styles.timeFieldTextActive,
                ]}
              >
                {displayHour}
              </Text>
            </Pressable>

            {/* Separator */}
            <Text style={styles.timeSeparator}>:</Text>

            {/* Minute Field */}
            <Pressable
              onPress={handleMinutePress}
              style={[
                styles.timeField,
                mode === 'minutes' && styles.timeFieldActive,
              ]}
            >
              <Text
                style={[
                  styles.timeFieldText,
                  mode === 'minutes' && styles.timeFieldTextActive,
                ]}
              >
                {displayMinute}
              </Text>
            </Pressable>
          </View>

          {/* AM/PM Toggle (only for 12-hour format) */}
          {!is24Hour && (
            <View style={styles.periodToggleContainer}>
              <Pressable
                onPress={() => handlePeriodChange('AM')}
                style={[
                  styles.periodButton,
                  styles.periodButtonTop,
                  period === 'AM' && styles.periodButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    period === 'AM' && styles.periodButtonTextActive,
                  ]}
                >
                  AM
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handlePeriodChange('PM')}
                style={[
                  styles.periodButton,
                  period === 'PM' && styles.periodButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    period === 'PM' && styles.periodButtonTextActive,
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
                <Text style={styles.actionButtonText}>Cancel</Text>
              </Pressable>
            )}
            {onConfirm && (
              <Pressable style={styles.actionButton} onPress={onConfirm}>
                <Text style={styles.actionButtonText}>OK</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  },
);

MaterialTimePicker.displayName = 'MaterialTimePicker';
