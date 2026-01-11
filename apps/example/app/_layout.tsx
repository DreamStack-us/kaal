import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Kaal Examples' }} />
      <Stack.Screen name="datepicker" options={{ title: 'DatePicker' }} />
      <Stack.Screen name="timepicker" options={{ title: 'TimePicker' }} />
      <Stack.Screen name="range" options={{ title: 'Date Range' }} />
    </Stack>
  );
}
