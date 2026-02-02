import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { commonStyles } from "@theme";
import { useAuth } from "@context/AuthContext";
import { AnimatedLogo, AnimatedText } from "./components";

interface SplashScreenProps {
  navigation: any;
}

export function SplashScreen({ navigation }: SplashScreenProps) {
  const { loading, isAuthenticated } = useAuth();

  const containerOpacity = useRef(new Animated.Value(1)).current;
  const bgOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bgIn = Animated.timing(bgOpacity, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    Animated.sequence([bgIn, Animated.delay(80)]).start();
  }, [bgOpacity]);

  useEffect(() => {
    if (loading) return;

    const t = setTimeout(() => {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start(() => {
        if (!isAuthenticated) navigation.replace("Login");
      });
    }, 3200);

    return () => clearTimeout(t);
  }, [loading, isAuthenticated, navigation, containerOpacity]);

  return (
    <Animated.View
      style={[
        commonStyles.container,
        styles.container,
        { opacity: containerOpacity },
      ]}
    >
      <View style={styles.content}>
        <AnimatedLogo />

        <AnimatedText />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
});
