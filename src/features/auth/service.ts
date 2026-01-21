// Servicio de autenticación
import { login } from '@/api';

export const loginService = async (email: string, password: string) => {
  try {
    const response = await login(email, password);
    return response;
  } catch (error) {
    throw error;
  }
}