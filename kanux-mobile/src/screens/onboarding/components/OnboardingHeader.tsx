import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@theme";

interface OnboardingHeaderProps {
  title: string;
  subtitle: string;
  stepLabel: string;
}

export function OnboardingHeader({
  title,
  subtitle,
  stepLabel,
}: OnboardingHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stepPill}>
        <Text style={styles.stepText}>{stepLabel}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  stepPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  stepText: {
    ...typography.caption,
    color: colors.white,
    letterSpacing: 0.6,
  },
  title: {
    ...typography.h2,
    color: colors.white,
    textAlign: "center",
  },
  subtitle: {
    ...typography.bodySmall,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
  },
});
