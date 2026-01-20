import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { useRouter } from 'expo-router'
import { AuthContext } from '@/auth/AuthProvider'

const LoginScreen = () => {
  const router = useRouter();

  const handleLogin = async () => {
    router.replace('/(app)/appointments');
  }

  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <TouchableWithoutFeedback onPress={handleLogin}>
        <Text style={{ marginTop: 12 }}>Login</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})