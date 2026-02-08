import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";
import sectionBase from "./sectionBase";

const styles = StyleSheet.create({
  ...sectionBase,
  wrapper: {
    ...sectionBase.wrapper,
    paddingBottom: spacing.xxxl,
  },
  title: {
    ...typography.body,
    fontWeight: "600",
    color: colors.textColors.primary,
    marginBottom: spacing.sm,
  },
  list: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

export default styles;
