import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: spacing.sm,
  },
  author: {
    ...typography.body,
    fontWeight: "600",
    color: colors.textColors.primary,
  },
  time: {
    ...typography.captionSmall,
    color: colors.textColors.tertiary,
  },
  content: {
    ...typography.body,
    color: colors.textColors.secondary,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
  },
  actionsLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    backgroundColor: colors.gray50,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  actionChipActive: {
    borderColor: "rgba(220, 38, 38, 0.25)",
    backgroundColor: "rgba(220, 38, 38, 0.08)",
  },
  actionChipSpacer: {
    marginRight: spacing.sm,
  },
  actionText: {
    ...typography.caption,
    color: colors.textColors.secondary,
    marginLeft: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: spacing.lg,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
  },
  commentTextWrap: {
    flex: 1,
  },
  latestLabel: {
    ...typography.captionSmall,
    color: colors.textColors.tertiary,
    marginBottom: 2,
  },
  latestText: {
    ...typography.bodySmall,
    color: colors.textColors.secondary,
  },
  viewAllWrap: {
    marginTop: spacing.sm,
    alignSelf: "center",
  },
  viewAllText: {
    ...typography.caption,
    color: colors.success,
    fontWeight: "600",
  },
});

export default styles;
