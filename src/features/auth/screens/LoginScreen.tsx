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
      router.replace('/(app)/patients');
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
        title='Login'
        onPress={handleLogin}
        type='primary'
      />
    </ScreenWrapper>
  )
}

export default LoginScreen
