import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography } from "@theme";

interface BadgeProps {
  count: number;
}

const Badge: React.FC<BadgeProps> = ({ count }) => (
  <View style={styles.container}>
    <Text style={styles.text}> 
      {count > 9 ? "+9" : count}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.emerald600,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  text: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: "600",
    color: colors.white,
  },
});

export default Badge;