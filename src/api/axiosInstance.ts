import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const API_BASE_URL = 
  process.env.EXPO_PUBLIC_API_BASE_URL || 
  Constants.expoConfig?.extra?.API_BASE_URL;


const api = axios.create({ 
  baseURL: API_BASE_URL, 
  timeout: 10000, 
  headers: { 'Content-Type': 'application/json' } 
});

api.interceptors.request.use(async cfg => {
  const token = await SecureStore.getItemAsync('authToken');
  if (token) cfg.headers = { ...(cfg.headers || {}), Authorization: `Bearer ${token}` } as any;
  return cfg;
}, err => Promise.reject(err));

api.interceptors.response.use(res => res, err => {
  if (err?.response?.status === 401) SecureStore.deleteItemAsync('authToken').catch(() => {});
  return Promise.reject(err);
});

export default api;
export { API_BASE_URL };
