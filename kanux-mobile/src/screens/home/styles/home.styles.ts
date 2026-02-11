import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";
import { commonStyles } from "../../../theme/commonStyles";

export const homeStyles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: colors.backgrounds.primary,
  },

  scrollContent: {
    paddingBottom: spacing.xxxl,
  },

  heroWrap: {
    backgroundColor: colors.primary,
    width: "100%",
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl + spacing.lg,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
  },
  heroTitle: {
    ...typography.h2,
    color: colors.white,
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 28,
  },
  heroSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "rgba(255,255,255,0.75)",
    marginTop: spacing.sm,
  },

  bubble1: {
    position: "absolute",
    right: -30,
    top: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  bubble2: {
    position: "absolute",
    left: -40,
    bottom: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  floatingArea: {
    marginTop: -spacing.xxl,
    paddingHorizontal: spacing.lg,
    width: "100%",
    maxWidth: 920,
    alignSelf: "center",
  },

  section: {
    marginTop: spacing.xl,
  },

  sectionHeaderRow: {
    ...commonStyles.rowBetween,
    marginBottom: spacing.md,
  },

  sectionTitle: {
    ...typography.h3,
    color: colors.textColors.primary,
    fontWeight: "700",
    fontSize: 16,
  },

  sectionSubtitle: {
    fontSize: 12,
    color: colors.textColors.secondary,
    marginTop: 2,
  },

  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.gray100,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
});
