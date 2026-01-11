import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { DatePicker, toISODateString } from '@dreamstack-us/kaal';

export default function RangeScreen() {
  const [range, setRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: new Date(),
    endDate: null,
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.hint}>
        Tap to select start date, then tap again for end date
      </Text>

      <View style={styles.rangeDisplay}>
        <View style={styles.dateBox}>
          <Text style={styles.label}>Start</Text>
          <Text style={styles.value}>
            {range.startDate ? toISODateString(range.startDate) : '-'}
          </Text>
        </View>
        <Text style={styles.arrow}>-&gt;</Text>
        <View style={styles.dateBox}>
          <Text style={styles.label}>End</Text>
          <Text style={styles.value}>
            {range.endDate ? toISODateString(range.endDate) : '-'}
          </Text>
        </View>
      </View>

      <DatePicker
        selectionMode="range"
        startDate={range.startDate}
        endDate={range.endDate}
        onRangeChange={setRange}
        variant="calendar"
        weekStartsOn={0}
        themeOverrides={{
          primaryColor: '#3b82f6',
          cellSelectedColor: '#3b82f6',
          cellInRangeColor: 'rgba(59, 130, 246, 0.15)',
          cellTodayColor: 'rgba(59, 130, 246, 0.1)',
          textColor: '#1e293b',
          textSelectedColor: '#ffffff',
          textInRangeColor: '#3b82f6',
          textDisabledColor: '#cbd5e1',
          backgroundColor: '#ffffff',
          borderRadius: 16,
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  hint: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  rangeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
  },
  dateBox: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  arrow: {
    fontSize: 20,
    color: '#94a3b8',
  },
});
