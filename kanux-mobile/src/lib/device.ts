import AsyncStorage from "@react-native-async-storage/async-storage";

const DEVICE_ID_KEY = "kanux_device_id";

export const generateDeviceId = (): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const combined = `${timestamp}-${randomString}`;

  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return `${Math.abs(hash).toString(16)}-${timestamp}`;
};

/**
 * Obtiene el ID del dispositivo de AsyncStorage (React Native compatible)
 * Si no existe, genera uno nuevo y lo guarda
 */
export const getDeviceId = async (): Promise<string> => {
  try {
    let deviceId = await AsyncStorage.getItem(DEVICE_ID_KEY);

    if (!deviceId) {
      deviceId = generateDeviceId();
      try {
        await AsyncStorage.setItem(DEVICE_ID_KEY, deviceId);
      } catch (error) {
        console.warn("Failed to store device ID in AsyncStorage:", error);
      }
    }

    return deviceId;
  } catch (error) {
    console.warn("Error accessing AsyncStorage:", error);
    // Fallback: genera un ID temporal si no se puede acceder a AsyncStorage
    return generateDeviceId();
  }
};

/**
 * Limpia el ID del dispositivo de AsyncStorage
 */
export const clearDeviceId = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(DEVICE_ID_KEY);
  } catch (error) {
    console.warn("Failed to clear device ID from AsyncStorage:", error);
  }
};

/**
 * Limpia y regenera el ID del dispositivo
 */
export const resetDeviceId = async (): Promise<string> => {
  await clearDeviceId();
  return getDeviceId();
};
