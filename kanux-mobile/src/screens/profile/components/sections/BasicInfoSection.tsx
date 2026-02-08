import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";
import { Card } from "@/components/ui/Card";
import { EditButton } from "@/components/ui/EditButton";

type Props = {
  onEditPress: () => void;
};

export const BasicInfoSection: React.FC<Props> = ({ onEditPress }) => (
  <View style={styles.wrapper}>
    <Card variant="shadow" padding="lg" style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Información básica</Text>
        <EditButton onPress={onEditPress} />
      </View>

      <InfoRow label="Nivel de experiencia" value="Expert" />
      <InfoRow label="Idiomas" value="English (Intermedio), Spanish (Básico)" />
      <InfoRow label="Disponibilidad" value="Freelance only" />
    </Card>
  </View>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  card: {
    borderRadius: 16,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: spacing.md,
  },
  title: {
    ...typography.body,
    fontWeight: "600",
    color: colors.textColors.primary,
  },

  row: {
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.textColors.tertiary,
  },
  value: {
    ...typography.bodySmall,
    color: colors.textColors.primary,
  },
});
