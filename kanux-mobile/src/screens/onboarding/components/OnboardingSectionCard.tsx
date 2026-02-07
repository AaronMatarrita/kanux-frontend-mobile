import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "@/components/ui/Card";
import { colors, spacing, typography } from "@theme";

interface OnboardingSectionCardProps {
  title: string;
  hint?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function OnboardingSectionCard({
  title,
  hint,
  children,
  footer,
}: OnboardingSectionCardProps) {
  return (
    <Card style={styles.card} padding="xl">
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {!!hint && <Text style={styles.hint}>{hint}</Text>}
      </View>

      <View style={styles.body}>{children}</View>

      {!!footer && <View style={styles.footer}>{footer}</View>}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
  },
  header: {
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.body,
    fontWeight: "700",
    color: colors.textColors.primary,
    letterSpacing: 0.3,
  },
  hint: {
    ...typography.bodySmall,
    color: colors.textColors.secondary,
  },
  body: {
    gap: spacing.md,
  },
  footer: {
    marginTop: spacing.xl,
  },
});
