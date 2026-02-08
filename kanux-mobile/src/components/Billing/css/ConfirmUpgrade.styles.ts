import { StyleSheet } from "react-native";
import { colors } from "@theme";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },

  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textColors.primary,
  },

  description: {
    marginVertical: 12,
    fontSize: 14,
    color: colors.textColors.secondary,
  },

  confirmButton: {
    marginTop: 12,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  confirmText: {
    color: colors.white,
    fontWeight: "600",
  },

  cancelText: {
    marginTop: 12,
    textAlign: "center",
    color: colors.gray600,
  },
});
