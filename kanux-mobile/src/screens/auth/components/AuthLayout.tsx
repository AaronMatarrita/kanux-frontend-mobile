import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";
import { Asset } from "expo-asset";
import { colors } from "@/theme/colors";

const logoUri = Asset.fromModule(
  require("../../../../assets/brand/kanux-logo.svg"),
).uri;

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <SvgUri uri={logoUri} width={180} height={52} />
      </View>

      <View style={styles.panel}>
        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  top: {
    height: 190,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  panel: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 40,
    borderTopLeftRadius: 90,
  },

  content: {
    flex: 1,
    gap: 12,
  },
});
