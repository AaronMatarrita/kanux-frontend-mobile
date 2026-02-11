import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export function AnimatedLogo() {
  return (
    <View style={styles.logoContainer}>
      <LottieView
        autoPlay
        loop={false}
        source={require("../../../../assets/lottie/logo-splash.json")}
        style={styles.lottie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 18,
  },
  lottie: {
    width: 160,
    height: 160,
  },
});
