import { StyleSheet } from "react-native";
import { colors } from "@theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textColors.primary,
  },

  subtitle: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 17,
    color: colors.textColors.secondary,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.gray600,
  },
});
