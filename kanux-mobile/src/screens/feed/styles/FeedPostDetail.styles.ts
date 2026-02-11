import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";

export default StyleSheet.create({
  flex: { flex: 1 },

  container: {
    backgroundColor: colors.backgrounds.primary,
  },

  contentWrap: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },

  // ===== Post Card =====
  postCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.gray100,
    padding: spacing.lg,
  },

  postHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  postHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  postHeaderText: {
    marginLeft: spacing.sm,
    flex: 1,
  },

  postAuthor: {
    ...typography.body,
    fontWeight: "700",
    color: colors.textColors.primary,
  },

  postTime: {
    ...typography.captionSmall,
    color: colors.textColors.tertiary,
    marginTop: 2,
  },

  postContent: {
    ...typography.body,
    color: colors.textColors.secondary,
    marginTop: spacing.md,
    lineHeight: 22,
  },

  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.lg,
  },

  actionChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.gray50,
    borderWidth: 1,
    borderColor: colors.gray100,
    marginRight: spacing.sm,
  },

  actionChipActive: {
    borderColor: "rgba(220, 38, 38, 0.25)",
    backgroundColor: "rgba(220, 38, 38, 0.08)",
  },

  actionText: {
    ...typography.caption,
    color: colors.textColors.secondary,
    marginLeft: spacing.xs,
    fontWeight: "700",
  },

  // ===== Comments header =====
  commentsHeader: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  commentsTitle: {
    ...typography.body,
    fontWeight: "800",
    color: colors.textColors.primary,
  },

  commentsSubtitle: {
    ...typography.captionSmall,
    color: colors.textColors.tertiary,
  },

  // ===== Comment item =====
  commentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },

  commentBubble: {
    flex: 1,
    marginLeft: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray100,
    borderRadius: 16,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },

  commentTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  commentAuthor: {
    ...typography.caption,
    fontWeight: "800",
    color: colors.textColors.primary,
    flex: 1,
    marginRight: spacing.sm,
  },

  commentTime: {
    ...typography.captionSmall,
    color: colors.textColors.tertiary,
  },

  commentText: {
    ...typography.bodySmall,
    color: colors.textColors.secondary,
    lineHeight: 20,
  },

  bottomSpacer: {
    height: 96,
  },

  // ===== Input bar =====
  commentInputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    backgroundColor: colors.backgrounds.primary,
  },

  inputWrap: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray100,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginRight: spacing.sm,
  },

  commentInput: {
    ...typography.bodySmall,
    color: colors.textColors.primary,
    minHeight: 44,
    maxHeight: 110,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },

  sendBtn: {
    height: 46,
    width: 46,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },

  sendBtnDisabled: {
    opacity: 0.45,
  },

  emptyCommentsWrap: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray100,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyCommentsTitle: {
    ...typography.body,
    fontWeight: "800",
    color: colors.textColors.primary,
  },

  emptyCommentsDesc: {
    ...typography.bodySmall,
    color: colors.textColors.tertiary,
    marginTop: spacing.xs,
    textAlign: "center",
  },

  commentsStateWrap: {
    marginTop: spacing.md,
    paddingVertical: spacing.lg,
  },
});
