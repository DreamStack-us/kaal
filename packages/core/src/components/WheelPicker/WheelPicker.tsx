import type React from 'react';
import { Text, View } from 'react-native';

interface WheelPickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

/**
 * Native WheelPicker stub - native platforms should use native date pickers.
 * This component exists for API compatibility but renders a placeholder.
 * Use DatePicker with theme="native" for proper native picker experience.
 */
export const WheelPicker: React.FC<WheelPickerProps> = () => {
  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ color: '#666' }}>
        Use DatePicker with theme="native" on this platform
      </Text>
    </View>
  );
};
