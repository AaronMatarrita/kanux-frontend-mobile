import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleHttpError } from "./http.errors";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const httpClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * Adds JWT token to headers if available.
 * Nota: Usa async/await para trabajar con AsyncStorage en React Native
 */

httpClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Obtener sesión de AsyncStorage (funciona en iOS, Android y web)
      const sessionData = await AsyncStorage.getItem("session");

      if (sessionData) {
        try {
          const session = JSON.parse(sessionData);
          if (session?.token) {
            config.headers.Authorization = `Bearer ${session.token}`;
          }
        } catch (error) {
          console.error("Error parsing session data:", error);
        }
      }
    } catch (error) {
      console.error("Error accessing AsyncStorage:", error);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response Interceptor
 * Centralized error handling.
 */
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    handleHttpError(error);
    return Promise.reject(error);
  },
);
