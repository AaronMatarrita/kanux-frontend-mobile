import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";
import sectionBase from "./sectionBase";

const styles = StyleSheet.create({
  ...sectionBase,
  headerRow: {
    ...sectionBase.headerRow,
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

export default styles;
