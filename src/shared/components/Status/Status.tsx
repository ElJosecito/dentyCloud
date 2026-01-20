import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/index';

type StatusProps = {
  status: string;
};

const statusMap: Record<string, keyof typeof colors> = {
  completed: 'success',
  scheduled: 'info',
  cancelled: 'error',
  pending: 'warning',
};

const Status: React.FC<StatusProps> = ({ status }) => {
  const key = status?.toLowerCase();
  const colorKey = statusMap[key] || 'gray';
  // pick a background color
  const bg = (colors as any)[colorKey] ?? colors.gray?.[100] ?? '#E5E7EB';
  const textColor = colorKey === 'gray' ? colors.text.primary : colors.text.light;

  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: textColor }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 9999,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Status;
