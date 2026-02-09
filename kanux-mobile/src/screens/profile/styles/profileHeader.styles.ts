import { StyleSheet } from "react-native";
import { colors, typography, spacing } from "@theme";

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  card: {
    borderRadius: 16,
  },

  editWrapper: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    zIndex: 1,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: spacing.md,
    alignSelf: "center",
    marginTop: spacing.sm,
  },
  name: {
    ...typography.h3,
    color: colors.textColors.primary,
    textAlign: "center",
  },
  role: {
    ...typography.bodySmall,
    color: colors.textColors.secondary,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  link: {
    ...typography.caption,
    color: colors.info,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  progressBlock: {
    marginTop: spacing.md,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  progressLabel: {
    ...typography.captionSmall,
    color: colors.textColors.secondary,
  },
  progressValue: {
    ...typography.captionSmall,
    color: colors.primary,
    fontWeight: "700",
  },
  progressHint: {
    ...typography.captionSmall,
    color: colors.textColors.secondary,
    marginTop: spacing.xs,
  },
});

export default styles;
