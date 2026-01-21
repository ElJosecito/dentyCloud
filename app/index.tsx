import { useContext } from 'react';
import { Redirect } from 'expo-router';
import { AuthContext } from '../src/auth/AuthProvider';
import LoginScreen from "@/features/auth/screens/LoginScreen"
import LoadingView from '@/shared/components/LoadingView';

const Index = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext)!;

  if (isLoading) {
    return <LoadingView />;
  }

  // Si está autenticado, redirigir a la app
  if (isAuthenticated) {
    return <Redirect href="/(app)/appointments" />;
  }

  // Si no está autenticado, mostrar login
  return <LoginScreen />;
}

export default Index