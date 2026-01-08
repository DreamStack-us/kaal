import {
  DatePicker,
  TimePicker,
  type TimeValue,
  toISODateString,
} from '@dreamstack-us/kaal';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [selectedTime, setSelectedTime] = useState<TimeValue>({
    hours: 9,
    minutes: 30,
  });

  // Format time for display
  const formatTimeDisplay = (time: TimeValue): string => {
    const hour12 = time.hours % 12 || 12;
    const period = time.hours >= 12 ? 'PM' : 'AM';
    return `${hour12}:${time.minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>Kaal DatePicker</Text>
      <Text style={styles.selected}>
        Selected: {toISODateString(selectedDate)}
      </Text>

      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        theme="native"
        variant="wheel"
      />

      <View style={styles.divider} />

      <Text style={styles.title}>Kaal TimePicker</Text>
      <Text style={styles.selected}>
        Selected: {formatTimeDisplay(selectedTime)}
      </Text>

      <View style={styles.pickerSection}>
        <Text style={styles.sectionTitle}>iOS Style (Wheel)</Text>
        <TimePicker
          value={selectedTime}
          onChange={setSelectedTime}
          theme="ios"
          is24Hour={false}
        />
      </View>

      <View style={styles.pickerSection}>
        <Text style={styles.sectionTitle}>Material Style (Clock)</Text>
        <TimePicker
          value={selectedTime}
          onChange={setSelectedTime}
          theme="android"
          is24Hour={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  container: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(10),
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.foreground.default,
    marginBottom: theme.spacing(2),
  },
  selected: {
    fontSize: 16,
    color: theme.colors.foreground.muted,
    marginBottom: theme.spacing(6),
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.default,
    marginVertical: theme.spacing(8),
  },
  pickerSection: {
    marginBottom: theme.spacing(6),
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.foreground.muted,
    marginBottom: theme.spacing(3),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
}));
