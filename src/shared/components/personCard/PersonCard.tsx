import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import MyText from '@/shared/components/Text/MyText';
import Avatar from '@/shared/components/AvatarPicture/Avatar';
import CustomIcon from '@/shared/components/customIcon/CustomIcon';
import { getStyles } from './styles';
import type { PersonCardProps } from './types';
import { formattedDate } from '@/shared/utils/utils';

const PersonCard: React.FC<PersonCardProps> = ({ patient, onPhonePress, onCardPress }) => {
  const styles = getStyles();

  return (
    <TouchableOpacity 
      style={styles.cardWrapper} 
      activeOpacity={0.7}
      onPress={() => onCardPress?.(patient.id)}
    >
      <View style={styles.cardLeft}>
        <Avatar name={patient.nombres} size={48} />
        <View style={styles.nameBlock}>
          <MyText type='body' bold style={styles.nameText}>
            {patient.nombres} {patient.apellidos}
          </MyText>
          <MyText type='caption2' style={styles.subText}>
            {formattedDate(patient.fechaNacimiento)}
          </MyText>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.actionBtn}
        onPress={(e) => {
          e.stopPropagation();
          onPhonePress?.(patient.id);
        }}
      >
        <CustomIcon name='Phone' size={16} color={'#2563EB'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PersonCard;
