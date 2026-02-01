import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography, commonStyles } from "@theme";

const LoginScreen: React.FC = () => {
  return (
    <View style={[commonStyles.container, commonStyles.centerContainer]}>
      <Text style={styles.title}>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.text.primary,
  },
});

export default LoginScreen;
