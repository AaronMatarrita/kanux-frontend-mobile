import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleHttpError } from "./http.errors";
import { Platform } from "react-native";
import Constants from "expo-constants";

let SecureStore: any = null;
try {
  SecureStore = require("expo-secure-store");
} catch (e) {
  SecureStore = null;
}

const normalizeBaseUrl = (raw: string) => {
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }
  return `http://${raw}`;
};

const resolveBaseUrl = () => {
  const globalUrl = process.env.EXPO_PUBLIC_API_URL;
  if (globalUrl) {
    return normalizeBaseUrl(globalUrl);
  }

  const deviceUrl = process.env.EXPO_PUBLIC_API_URL_DEVICE;
  if (deviceUrl && Platform.OS !== "web") {
    return normalizeBaseUrl(deviceUrl);
  }

  if (Constants.isDevice) {
    const hostUri =
      Constants.expoConfig?.hostUri ||
      (Constants as { hostUri?: string }).hostUri ||
      "";
    const host = hostUri.split(":")[0];
    if (host) {
      return `http://${host}:3000`;
    }
  }

  if (Platform.OS === "android") {
    const androidEmulatorUrl = process.env.EXPO_PUBLIC_API_URL_ANDROID_EMULATOR;
    if (androidEmulatorUrl) {
      return normalizeBaseUrl(androidEmulatorUrl);
    }
    return "http://10.0.2.2:3000";
  }

  const iosSimulatorUrl = process.env.EXPO_PUBLIC_API_URL_IOS_SIMULATOR;
  if (iosSimulatorUrl) {
    return normalizeBaseUrl(iosSimulatorUrl);
  }

  return "http://localhost:3000";
};

const API_URL = resolveBaseUrl();

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
 */

httpClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      let sessionData: string | null = null;

      if (SecureStore) {
        sessionData = await SecureStore.getItemAsync("session");
      }

      if (!sessionData) {
        sessionData = await AsyncStorage.getItem("session");
      }

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
