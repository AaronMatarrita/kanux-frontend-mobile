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

  const clearPersistedSession = async () => {
    if (SecureStore) {
      await SecureStore.deleteItemAsync("session");
    }
    await AsyncStorage.removeItem("session");
  };

  const decodeJwtPayload = (token: string) => {
    const parts = token.split(".");
    if (parts.length < 2) return null;

    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, "=");

    try {
      if (typeof globalThis.atob === "function") {
        return JSON.parse(globalThis.atob(padded)) as { exp?: number };
      }
      if (typeof Buffer !== "undefined") {
        return JSON.parse(Buffer.from(padded, "base64").toString("utf8")) as {
          exp?: number;
        };
      }
    } catch (error) {
      console.error("Error decoding JWT payload:", error);
    }

    return null;
  };

  const isTokenValid = (token?: string) => {
    if (!token) return false;
    const payload = decodeJwtPayload(token);
    if (!payload?.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  };

  const isTalentSession = (sessionData?: Session | null) => {
    return sessionData?.user?.userType === "talent";
  };

  useEffect(() => {
    const loadSession = async () => {
      try {
        let sessionData: string | null = null;

        if (SecureStore) {
          sessionData = await SecureStore.getItemAsync("session");
        }

        if (!sessionData) {
          sessionData = await AsyncStorage.getItem("session");
        }

        if (sessionData) {
          const parsed = JSON.parse(sessionData) as Session;
          if (isTokenValid(parsed?.token) && isTalentSession(parsed)) {
            setSession(parsed);
          } else {
            await clearPersistedSession();
            setSession(null);
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
      await clearPersistedSession();

      setSession(null);
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  };

  const isAuthenticated = Boolean(
    session?.isAuthenticated && session?.token && isTalentSession(session),
  );

  return (
    <AuthContext.Provider
      value={{ session, login, logout, loading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
