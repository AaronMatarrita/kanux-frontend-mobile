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

        <View style={styles.progressBlock}>
          <View style={styles.progressHeader}>
            <SkeletonBlock style={styles.progressLabel} />
            <SkeletonBlock style={styles.progressValue} />
          </View>
          <SkeletonBlock style={styles.progressBar} />
          <SkeletonBlock style={styles.progressHint} />
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

      {/* Settings Section Skeleton */}
      <Card variant="shadow" style={styles.card}>
        <View style={[styles.settingsHeader]}>
          <SkeletonBlock style={styles.sectionTitle} />
        </View>
        <View style={styles.settingsItem}>
          <View style={styles.settingsItemLeft}>
            <SkeletonBlock style={styles.settingsIcon} />
            <SkeletonBlock style={styles.settingsLabel} />
          </View>
          <SkeletonBlock style={styles.settingsChevron} />
        </View>
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
  progressBlock: {
    marginTop: spacing.md,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  progressLabel: {
    width: "30%",
    height: 10,
  },
  progressValue: {
    width: "18%",
    height: 10,
  },
  progressBar: {
    width: "100%",
    height: 8,
    borderRadius: 6,
  },
  progressHint: {
    width: "80%",
    height: 10,
    marginTop: spacing.xs,
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
  settingsHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  settingsLabel: {
    width: 140,
    height: 12,
  },
  settingsChevron: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
