import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
    flexShrink: 0,
  },
  center: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    ...typography.bodySmall,
    color: colors.textColors.primary,
    fontWeight: "600",
  },
  date: {
    ...typography.caption,
    color: colors.textColors.tertiary,
    marginTop: 2,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: spacing.md,
    gap: spacing.sm,
    flexShrink: 0,
  },
  diffPill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  diffText: {
    ...typography.caption,
    fontWeight: "600",
  },
  pointsPill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: colors.gray900,
  },
  pointsText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: "700",
  },
});

export default styles;
