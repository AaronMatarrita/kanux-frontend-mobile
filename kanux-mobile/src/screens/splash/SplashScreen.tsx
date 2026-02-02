import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { colors, commonStyles } from "@theme";
import { KanuxLogo } from "@components/KanuxLogo";
import { useAuth } from "@context/AuthContext";

interface SplashScreenProps {
  navigation: any;
}

export function SplashScreen({ navigation }: SplashScreenProps) {
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace("Login");
      } else {
        navigation.replace("Login");
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [loading, isAuthenticated, navigation]);

  return (
    <View style={[commonStyles.container, styles.container]}>
      <View style={styles.logoContainer}>
        <KanuxLogo width={120} height={120} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
});
