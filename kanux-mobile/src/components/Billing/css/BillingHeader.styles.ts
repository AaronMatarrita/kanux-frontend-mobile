import { StyleSheet, Platform, StatusBar } from "react-native";
import { colors, typography } from "@theme";

export const styles = StyleSheet.create({
  statusBarBackground: {
    backgroundColor: colors.primary,
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  wrapper: {
    backgroundColor: colors.primary,
  },

  container: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  textContainer: {
    flex: 1,
    marginHorizontal: 12,
    alignItems: "center",
  },

  title: {
    ...typography.h1,
    fontSize: 20,
    fontWeight: "600",
    color: colors.textColors.inverted,
    letterSpacing: -0.4,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
  },
});
