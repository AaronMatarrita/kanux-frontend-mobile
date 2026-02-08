import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { Card } from "@/components/ui/Card";

export const BasicInfoSection = () => (
  <View style={styles.wrapper}>
    <Card variant="shadow" padding="lg" style={styles.card}>
      <Text style={styles.title}>Información básica</Text>

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
    alignItems: "flex-start",
    borderRadius: 16,
  },
  title: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: spacing.md,
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
