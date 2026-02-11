import { StyleSheet } from "react-native";
import { colors } from "@theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textColors.primary,
    marginBottom: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textColors.primary,
  },

  subtitle: {
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 22,
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
