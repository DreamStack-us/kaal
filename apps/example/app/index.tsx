import { Link } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kaal Component Examples</Text>
      <Text style={styles.subtitle}>Test components locally</Text>

      <View style={styles.links}>
        <Link href="/datepicker" asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>DatePicker (Calendar)</Text>
          </Pressable>
        </Link>

        <Link href="/range" asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>Date Range Selection</Text>
          </Pressable>
        </Link>

        <Link href="/timepicker" asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>TimePicker (iOS + Material)</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 32,
  },
  links: {
    gap: 12,
  },
  link: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
  },
  linkText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
