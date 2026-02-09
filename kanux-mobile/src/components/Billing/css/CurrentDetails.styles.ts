import { StyleSheet } from "react-native";
import { colors } from "@theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.borders.primary,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textColors.primary,
    marginBottom: 12,
  },
});
