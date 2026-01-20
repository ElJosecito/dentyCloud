import { StyleSheet } from 'react-native';
import { colors } from '../../constants/index';

export const getStyles = () =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      marginLeft: 12,
    },
    meta: {
      marginTop: 6,
      color: colors.text.secondary,
    },
  });
