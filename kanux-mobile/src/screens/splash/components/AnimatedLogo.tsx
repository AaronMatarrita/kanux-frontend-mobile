import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { KanuxLogo } from "@components/KanuxLogo";

export function AnimatedLogo() {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.86)).current;

  useEffect(() => {
    const logoIn = Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 120,
        useNativeDriver: true,
      }),
    ]);

    logoIn.start();
  }, [logoOpacity, logoScale]);

  return (
    <Animated.View
      style={[
        styles.logoContainer,
        { opacity: logoOpacity, transform: [{ scale: logoScale }] },
      ]}
    >
      <KanuxLogo width={120} height={120} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 18,
  },
});
