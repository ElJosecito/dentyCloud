import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../src/auth/AuthProvider';
import ScreenWrapper from '@/shared/components/ScreenWrapper/ScreenWrapper';
import MyText from '@/shared/components/Text/MyText';
import CustomIcon from '@/shared/components/customIcon/CustomIcon';
import { colors } from '@/shared/constants/index';

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useContext(AuthContext)!;

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/');
          },
        },
      ]
    );
  };

  return (
    <ScreenWrapper
      withSafeArea
      withTopSafeArea={true}
      withBottomSafeArea={true}
      withHorizontalPadding={true}
      scrollable={false}
      style={{ backgroundColor: colors.background }}
    >

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <CustomIcon name="LogOut" size={20} color={colors.error} />
        <MyText type="body" style={styles.logoutText}>Cerrar Sesión</MyText>
      </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  section: {
    flex: 1,
    justifyContent: 'center',

  },
  versionText: {
    color: colors.text.secondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.card,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.error,
    marginBottom: 20,
  },
  logoutText: {
    color: colors.error,
    fontWeight: '600',
  },
});
