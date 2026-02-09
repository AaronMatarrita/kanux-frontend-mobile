import { StyleSheet } from "react-native";
import { colors } from "@theme";

export const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.planButton,
    justifyContent: "center",
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray300,
  },

  text: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textColors.inverted,
  },

  disabledText: {
    color: colors.gray400,
  },
});
