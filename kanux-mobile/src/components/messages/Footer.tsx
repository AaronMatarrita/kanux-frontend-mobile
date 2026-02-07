import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography } from "@theme";

interface FooterProps {
  text?: string;
}

const Footer: React.FC<FooterProps> = ({ 
  text = "Connect, collaborate, and grow professionally, knowing your messages are in a safe space."
}) => (
  <View style={styles.container}>
    <Text style={styles.text}> 
      {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgrounds.secondary,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: "center",
  },
  text: {
    ...typography.body,
    fontSize: 13,
    color: colors.textColors.secondary,
    textAlign: "center",
    lineHeight: 18,
  },
});

export default Footer;