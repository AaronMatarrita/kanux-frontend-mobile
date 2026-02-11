import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "@theme";

interface SeparatorProps {
  withMargin?: boolean;
}

const Separator: React.FC<SeparatorProps> = ({ withMargin = true }) => (
  <View style={[styles.line, withMargin && styles.withMargin]} />
);

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: colors.border,
  },
  withMargin: {
    marginLeft: 76,
  },
});

export default Separator;