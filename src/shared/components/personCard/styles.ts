import { StyleSheet } from 'react-native';
import { colors } from '../../constants/index';

export const getStyles = () =>
  StyleSheet.create({
    cardWrapper: {
      width: '100%',
      backgroundColor: colors.card,
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    nameBlock: {
      marginLeft: 12,
      justifyContent: 'center',
    },
    nameText: {
      color: colors.text.primary,
    },
    subText: {
      color: colors.text.secondary,
      marginTop: 2,
    },
    actionBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.gray?.[100],
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
