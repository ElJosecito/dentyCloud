import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { useRouter } from 'expo-router'
import { AuthContext } from '@/auth/AuthProvider'
import CustomIcon from '@/shared/components/customIcon/CustomIcon'
import MyButton from '@/shared/components/Button/MyButton'
import MyText from '@/shared/components/Text/MyText'
import ScreenWrapper from '@/shared/components/ScreenWrapper/ScreenWrapper'
import { colors } from '@/shared/constants/index'
import MyInput from '@/shared/components/Input/MyInput'
import { loginService } from '../service'

const LoginScreen = () => {
  const router = useRouter();

  const { login } = useContext(AuthContext)!;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = async () => {
    try {
      const response = await loginService(email, password);
      await login(response.token);

      // Navegar a la pantalla principal después del login
      router.replace('/(app)/appointments');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <ScreenWrapper
      withSafeArea
      withTopSafeArea={true}
      withBottomSafeArea={false}
      withHorizontalPadding={true}
      style={{ justifyContent: 'center', backgroundColor: colors.background }}
    >
      {/* Header de bienvenida */}
      <View style={styles.headerContainer}>
        <MyText type="h1" style={styles.title}>¡Bienvenido a DentyCloud!</MyText>
        <MyText type="body" style={styles.subtitle}>
          Inicia sesión para continuar
        </MyText>
      </View>

      <MyInput
        placeholder='Email'
        keyboardType='email-address'
        style={{ marginBottom: 16 }}
        value={email}
        onChangeText={setEmail}
      />

      <MyInput
        placeholder='Password'
        secureTextEntry
        style={{ marginBottom: 24 }}
        value={password}
        onChangeText={setPassword}
      />

      <MyButton
        title='Iniciar Sesión'
        onPress={handleLogin}
        type='primary'
      />

      {/* No tienes cuenta */}
      <View style={styles.registerContainer}>
        <MyText type="body2" style={styles.registerText}>
          ¿No tienes cuenta?{' '}
        </MyText>
        <TouchableWithoutFeedback onPress={() => {}}>
          <MyText type="body2" style={styles.registerLink}>
            Regístrate
          </MyText>
        </TouchableWithoutFeedback>
      </View>
    </ScreenWrapper>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.text.secondary,
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    color: colors.text.secondary,
  },
  registerLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});
