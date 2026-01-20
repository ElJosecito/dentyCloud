import React from 'react';
import { View } from 'react-native';
import CustomIcon from '@/shared/components/customIcon/CustomIcon';
import MyText from '@/shared/components/Text/MyText';
import Status from '@/shared/components/Status/Status';
import { getStyles } from './styles';
import type { AppointmentCardProps } from './types';
import { formattedDate } from '@/shared/utils/utils';

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const styles = getStyles();

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={styles.title}>
            <MyText type="body" bold>
            {appointment.reason}
            </MyText>
            <MyText type="caption2" style={styles.meta}>
              {formattedDate(appointment.date)}
            </MyText>
            <MyText type="caption2" style={styles.meta}>
              {appointment.doctor ?? ''}
            </MyText>
          </View> 
        </View>
        

        <Status status={appointment.status} />
      </View>
    </View>
  );
};

export default AppointmentCard;
