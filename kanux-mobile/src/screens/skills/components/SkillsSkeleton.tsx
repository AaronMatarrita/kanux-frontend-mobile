import React from "react";
import { View, StyleSheet } from "react-native";
import { Card } from "@/components/ui/Card";
import { colors, spacing } from "@/theme";

type BlockProps = {
  width?: string | number;
  height?: number;
  style?: object;
};

const SkeletonBlock: React.FC<BlockProps> = ({
  width = "100%",
  height = 10,
  style,
}) => <View style={[styles.block, { width, height }, style]} />;

const SkillCategorySkeleton: React.FC = () => (
  <Card variant="shadow" padding="lg" style={styles.card}>
    <SkeletonBlock width="40%" height={12} style={styles.sectionTitle} />
    <View style={styles.skillRow}>
      <SkeletonBlock width="60%" height={10} />
      <SkeletonBlock width="12%" height={10} />
    </View>
    <SkeletonBlock height={6} style={styles.progress} />
    <View style={styles.skillRow}>
      <SkeletonBlock width="55%" height={10} />
      <SkeletonBlock width="12%" height={10} />
    </View>
    <SkeletonBlock height={6} style={styles.progress} />
  </Card>
);

export const SkillsSkeleton: React.FC<{ hideTabs?: boolean }> = ({
  hideTabs,
}) => {
  return (
    <View style={styles.container}>
      {!hideTabs && (
        <View style={styles.tabs}>
          <SkeletonBlock height={36} style={styles.tab} />
          <SkeletonBlock height={36} style={styles.tab} />
        </View>
      )}

      <SkillCategorySkeleton />
      <SkillCategorySkeleton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  block: {
    backgroundColor: colors.gray200,
    borderRadius: 8,
  },
  tabs: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    borderRadius: 18,
  },
  card: {
    borderRadius: 16,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  progress: {
    marginBottom: spacing.md,
    borderRadius: 6,
  },
});
