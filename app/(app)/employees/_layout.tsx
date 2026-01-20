import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function EmployeesLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}
