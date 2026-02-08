import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Card } from "@/components/ui/Card";
import { colors, spacing } from "@/theme";

type BlockProps = {
  style?: ViewStyle;
};

const SkeletonBlock: React.FC<BlockProps> = ({ style }) => (
  <View style={[styles.block, style]} />
);

export const ProfileSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <Card variant="shadow" padding="lg" style={styles.card}>
        <View style={styles.center}>
          <View style={styles.avatar} />
          <SkeletonBlock style={styles.name} />
          <SkeletonBlock style={styles.subtitle} />
          <SkeletonBlock style={styles.link} />
        </View>
      </Card>

      <View style={styles.tabs}>
        <SkeletonBlock style={styles.tab} />
        <SkeletonBlock style={styles.tab} />
        <SkeletonBlock style={styles.tab} />
      </View>

      <Card variant="shadow" padding="lg" style={styles.card}>
        <SkeletonBlock style={styles.sectionTitle} />
        <SkeletonBlock style={styles.line} />
        <SkeletonBlock style={styles.lineWide} />
        <SkeletonBlock style={styles.line} />
      </Card>

      <Card variant="shadow" padding="lg" style={styles.card}>
        <SkeletonBlock style={styles.sectionTitle} />
        <SkeletonBlock style={styles.line} />
        <SkeletonBlock style={styles.line} />
        <SkeletonBlock style={styles.line} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  card: {
    borderRadius: 16,
  },
  center: {
    alignItems: "center",
  },
  block: {
    backgroundColor: colors.gray200,
    borderRadius: 10,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.gray200,
    marginBottom: spacing.md,
  },
  name: {
    width: "60%",
    height: 16,
    marginBottom: spacing.sm,
  },
  subtitle: {
    width: "70%",
    height: 12,
    marginBottom: spacing.sm,
  },
  link: {
    width: "50%",
    height: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    height: 36,
    borderRadius: 18,
  },
  sectionTitle: {
    width: "40%",
    height: 12,
    marginBottom: spacing.md,
  },
  line: {
    width: "80%",
    height: 10,
    marginBottom: spacing.sm,
  },
  lineWide: {
    width: "95%",
    height: 10,
    marginBottom: spacing.sm,
  },
});
