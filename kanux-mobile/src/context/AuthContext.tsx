import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "../types/session.types";

let SecureStore: any = null;
try {
  SecureStore = require("expo-secure-store");
} catch (e) {
  console.warn("expo-secure-store no está disponible, usando AsyncStorage");
}

type AuthContextType = {
  session: Session | null;
  login: (session: Session) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        if (SecureStore) {
          const sessionData = await SecureStore.getItemAsync("session");
          if (sessionData) {
            setSession(JSON.parse(sessionData));
          }
        } else {
          const stored = await AsyncStorage.getItem("session");
          if (stored) {
            setSession(JSON.parse(stored));
          }
        }
      } catch (error) {
        console.error("Error loading session:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (sessionData: Session) => {
    try {
      if (SecureStore) {
        await SecureStore.setItemAsync("session", JSON.stringify(sessionData));
      } else {
        await AsyncStorage.setItem("session", JSON.stringify(sessionData));
      }

      setSession(sessionData);
    } catch (error) {
      console.error("Error saving session:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (SecureStore) {
        await SecureStore.deleteItemAsync("session");
      } else {
        await AsyncStorage.removeItem("session");
      }

      setSession(null);
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  };

  const isAuthenticated = session?.isAuthenticated || false;

  return (
    <AuthContext.Provider
      value={{ session, login, logout, loading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
