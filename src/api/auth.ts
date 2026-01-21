// API de autenticación
import axiosInstance from "./axiosInstance";

// Función para iniciar sesión 
export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};
