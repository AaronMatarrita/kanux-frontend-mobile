import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export const ProfileProgress = () => {
  const progress = 100;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Completa tu perfil</Text>
        <Text style={styles.percent}>{progress}%</Text>
      </View>

      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textColors.secondary,
  },
  percent: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: "600",
  },
  bar: {
    height: 6,
    backgroundColor: colors.gray200,
    borderRadius: 6,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
});
