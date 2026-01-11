import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TimePicker } from '@dreamstack-us/kaal';

export default function TimePickerScreen() {
  const [time, setTime] = useState({
    hours: 9,
    minutes: 30,
  });

  const formatTime = (h: number, m: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    const mins = String(m).padStart(2, '0');
    return hour12 + ':' + mins + ' ' + period;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>
        Selected: {formatTime(time.hours, time.minutes)}
      </Text>

      <Text style={styles.sectionTitle}>iOS Style (Wheel)</Text>
      <View style={styles.pickerContainer}>
        <TimePicker
          value={time}
          onChange={setTime}
          theme="ios"
          themeOverrides={{
            backgroundColor: '#ffffff',
            textColor: '#1e293b',
            primaryColor: '#3b82f6',
          }}
        />
      </View>

      <Text style={styles.sectionTitle}>Material Style (Clock)</Text>
      <View style={styles.pickerContainer}>
        <TimePicker
          value={time}
          onChange={setTime}
          theme="material"
          themeOverrides={{
            backgroundColor: '#ffffff',
            textColor: '#1e293b',
            primaryColor: '#3b82f6',
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 24,
    marginBottom: 12,
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
});
