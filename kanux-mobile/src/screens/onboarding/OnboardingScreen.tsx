import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { colors, commonStyles } from "@theme";
import { KanuxLogo } from "@components/KanuxLogo";

interface OnboardingScreenProps {
  navigation: any;
}

export function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

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
