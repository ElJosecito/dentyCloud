import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '../Text/MyText';

interface StatusBadgeProps {
  status: number;
  statusText: string;
  size?: 'small' | 'medium' | 'large';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, statusText, size = 'medium' }) => {
  const getStatusColor = (estadoCita: number) => {
    switch (estadoCita) {
      case 1: return '#FFA500'; // Pendiente
      case 2: return '#4CAF50'; // Confirmada
      case 3: return '#F44336'; // Cancelada
      case 4: return '#2196F3'; // Completada
      default: return '#9E9E9E';
    }
  };

  const color = getStatusColor(status);

  const sizeStyles = {
    small: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    medium: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    large: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
  };

  const textSizes = {
    small: 'caption2',
    medium: 'body2',
    large: 'body1',
  } as const;

  return (
    <View style={[styles.badge, sizeStyles[size], { backgroundColor: color + '20' }]}>
      <MyText type={"small"} style={[styles.text, { color, fontWeight: 'bold' }]}>
        {statusText}
      </MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'center',
  },
  text: {
    fontWeight: '600',
  },
});

export default StatusBadge;
