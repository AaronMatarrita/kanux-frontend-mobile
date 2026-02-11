import { StyleSheet } from "react-native";
import { colors } from "@theme";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textColors.primary,
  },

  value: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textColors.secondary,
  },
});
