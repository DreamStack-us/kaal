import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { DatePicker, toISODateString } from '@dreamstack-us/kaal';

export default function DatePickerScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>
        Selected: {toISODateString(selectedDate)}
      </Text>

      <Text style={styles.sectionTitle}>Light Theme</Text>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        variant="calendar"
        weekStartsOn={0}
        themeOverrides={{
          primaryColor: '#3b82f6',
          cellSelectedColor: '#3b82f6',
          cellTodayColor: 'rgba(59, 130, 246, 0.15)',
          textColor: '#1e293b',
          textSelectedColor: '#ffffff',
          textDisabledColor: '#94a3b8',
          backgroundColor: '#ffffff',
          borderRadius: 16,
        }}
      />

      <Text style={styles.sectionTitle}>Dark Theme</Text>
      <View style={styles.darkContainer}>
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          variant="calendar"
          weekStartsOn={0}
          themeOverrides={{
            primaryColor: '#22d3ee',
            cellSelectedColor: '#22d3ee',
            cellTodayColor: 'rgba(34, 211, 238, 0.2)',
            textColor: '#f8fafc',
            textSelectedColor: '#0f172a',
            textDisabledColor: '#64748b',
            backgroundColor: '#1e293b',
            borderRadius: 16,
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
    fontSize: 16,
    marginBottom: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 24,
    marginBottom: 12,
  },
  darkContainer: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 16,
  },
});
