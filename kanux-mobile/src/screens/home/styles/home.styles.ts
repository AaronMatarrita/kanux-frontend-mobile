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

  // Hero
  heroWrap: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTitle: {
    ...typography.h2,
    color: colors.white,
  },
  heroSubtitle: {
    ...typography.bodySmall,
    color: "rgba(255,255,255,0.85)",
    marginTop: spacing.sm,
  },

  // Decorative bubbles (vida sin inventar data)
  bubble1: {
    position: "absolute",
    right: -30,
    top: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  bubble2: {
    position: "absolute",
    left: -40,
    bottom: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  // Floating area
  floatingArea: {
    marginTop: -spacing.xxl, // “cards flotando” como el ejemplo
    paddingHorizontal: spacing.lg,
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
  },

  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.textColors.secondary,
    marginTop: spacing.xs,
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
