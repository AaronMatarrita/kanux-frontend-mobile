import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgrounds.primary,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  listSeparator: {
    height: spacing.lg,
  },
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  footerLoader: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.lg,
  },
  stateTitle: {
    ...typography.body,
    color: colors.textColors.secondary,
    marginTop: spacing.md,
  },
});

export default styles;
