import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

interface AuthFooterProps {
  text: string;
  linkText: string;
  onLinkPress: () => void;
}

export function AuthFooter({ text, linkText, onLinkPress }: AuthFooterProps) {
  return (
    <View style={styles.footerRow}>
      <Text style={styles.footerText}>{text} </Text>
      <Pressable onPress={onLinkPress}>
        <Text style={styles.footerLink}>{linkText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: colors.white,
    opacity: 0.8,
  },
  footerLink: {
    color: "#34D399",
    fontWeight: "700",
  },
});
