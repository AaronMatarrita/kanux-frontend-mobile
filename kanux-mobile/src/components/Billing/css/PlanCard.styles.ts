import { StyleSheet } from "react-native";
import { colors } from "@theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borders.primary,
  },

  currentPlanBorder: {
    borderWidth: 2,
    borderColor: colors.emerald600,
    shadowColor: colors.emerald600,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textColors.primary,
  },

  price: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.textColors.primary,
  },

  month: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textColors.secondary,
  },

  description: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 12,
    color: colors.textColors.secondary,
  },
});
