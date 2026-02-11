import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";

const sectionBase = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  card: {
    borderRadius: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.body,
    fontWeight: "600",
    color: colors.textColors.primary,
  },
});

export default sectionBase;
