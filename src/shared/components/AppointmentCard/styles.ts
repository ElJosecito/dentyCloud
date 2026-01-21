import { StyleSheet } from 'react-native';
import { colors } from '../../constants/index';

export const getStyles = () =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginBottom: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardBorder: {
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + '15',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      gap: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    patientName: {
      flex: 1,
      color: colors.text.primary,
    },
    details: {
      gap: 4,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    detailText: {
      color: colors.text.secondary,
    },
  });
