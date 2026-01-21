import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomIcon from '@/shared/components/customIcon/CustomIcon';
import MyText from '@/shared/components/Text/MyText';
import StatusBadge from '@/shared/components/StatusBadge/StatusBadge';
import { getStyles } from './styles';
import type { AppointmentCardProps } from './types';
import { colors } from '@/shared/constants';

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onPress, isLast }) => {
  const styles = getStyles();

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const day = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    return { time, day };
  };

  const { time, day } = formatDateTime(appointment.fechaInicio);

  return (
    <TouchableOpacity 
      style={[styles.card, !isLast && styles.cardBorder]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <CustomIcon name="Calendar" size={20} color={colors.text.secondary} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <MyText type="body" style={[styles.patientName, { fontWeight: 'bold' }]}>
              {appointment.paciente.nombres} {appointment.paciente.apellidos}
            </MyText>
            <StatusBadge 
              status={appointment.estadoCita} 
              statusText={appointment.estado} 
              size="small"
            />
          </View>

          <View style={styles.details}>
            <View style={styles.detailRow}>
              <CustomIcon name="Clock" size={14} color={colors.text.secondary} />
              <MyText type="caption1" style={styles.detailText}>
                {time} • {day}
              </MyText>
            </View>
            <View style={styles.detailRow}>
              <CustomIcon name="User" size={14} color={colors.text.secondary} />
              <MyText type="caption1" style={styles.detailText}>
                Dr. {appointment.empleadoAtiende.nombreCompleto}
              </MyText>
            </View>
          </View>
        </View>

        <CustomIcon name="ChevronRight" size={20} color={colors.text.secondary} />
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentCard;
