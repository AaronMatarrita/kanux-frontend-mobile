import { StyleSheet } from "react-native";
import { colors } from "@theme";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },

  icon: {
    width: 20,
    fontSize: 14,
    fontWeight: "700",
  },

  ok: {
    color: colors.primary,
  },

  no: {
    color: colors.primary,
  },

  label: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textColors.secondary,
  },
});
