import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";
import { Card } from "@/components/ui/Card";
import { EditButton } from "@/components/ui/EditButton";

type Props = {
  onEditPress: () => void;
};

export const AboutSection: React.FC<Props> = ({ onEditPress }) => {
  return (
    <View style={styles.wrapper}>
      <Card variant="shadow" padding="lg" style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Acerca de</Text>
          <EditButton onPress={onEditPress} />
        </View>
        <Text style={styles.text}>
          I am a Senior UI/UX Designer with 6+ years of experience...
        </Text>
      </Card>
    </View>
  );
};

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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.body,
    fontWeight: "600",
    color: colors.textColors.primary,
  },
  text: {
    ...typography.bodySmall,
    color: colors.textColors.secondary,
  },
});
