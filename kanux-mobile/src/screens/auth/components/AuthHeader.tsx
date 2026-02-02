import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  divider?: boolean;
}

export function AuthHeader({
  title,
  subtitle,
  divider = false,
}: AuthHeaderProps) {
  return (
    <>
      <Text style={styles.welcome}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {divider && (
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>O regístrate con email</Text>
          <View style={styles.dividerLine} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 34,
    fontWeight: "800",
    color: "#2EAA50",
    textAlign: "center",
    marginTop: 6,
  },
  subtitle: {
    color: colors.white,
    opacity: 0.85,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  dividerText: {
    color: colors.white,
    opacity: 0.85,
    fontSize: 12,
  },
});
