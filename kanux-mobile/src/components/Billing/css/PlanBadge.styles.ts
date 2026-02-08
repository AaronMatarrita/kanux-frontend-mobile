import { StyleSheet } from "react-native";
import { colors } from "@theme";

export const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.planButton,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  text: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.white,
  },
});
