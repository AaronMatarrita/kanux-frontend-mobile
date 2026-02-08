import { StyleSheet } from "react-native";
import { colors, typography } from "@/theme";
import sectionBase from "./sectionBase";

const styles = StyleSheet.create({
  ...sectionBase,
  text: {
    ...typography.bodySmall,
    color: colors.textColors.secondary,
  },
});

export default styles;
