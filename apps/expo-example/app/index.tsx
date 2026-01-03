import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Temporal } from '@js-temporal/polyfill';
import { DatePicker } from '@dreamstack/kaal';
import { StyleSheet } from 'react-native-unistyles';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(
    Temporal.Now.plainDateISO()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kaal DatePicker</Text>
      <Text style={styles.selected}>
        Selected: {selectedDate.toString()}
      </Text>

      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        theme="native"
        variant="wheel"
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
    padding: theme.spacing(4),
    paddingTop: theme.spacing(16),
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.foreground.default,
    marginBottom: theme.spacing(4),
  },
  selected: {
    fontSize: 16,
    color: theme.colors.foreground.muted,
    marginBottom: theme.spacing(6),
  },
}));
