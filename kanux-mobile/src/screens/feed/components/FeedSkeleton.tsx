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

const FeedPostSkeleton: React.FC = () => {
  return (
    <Card variant="shadow" padding="lg" style={styles.card}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar} />
          <SkeletonBlock style={styles.authorName} />
        </View>
        <SkeletonBlock style={styles.time} />
      </View>

      {/* Content */}
      <View style={styles.contentBlock}>
        <SkeletonBlock style={styles.contentLine1} />
        <SkeletonBlock style={styles.contentLine2} />
        <SkeletonBlock style={styles.contentLine3} />
      </View>

      {/* Actions Row */}
      <View style={styles.actionsRow}>
        <SkeletonBlock style={styles.actionChip} />
        <SkeletonBlock style={styles.actionChip} />
      </View>

      <View style={styles.divider} />

      {/* Latest Comment */}
      <View style={styles.commentRow}>
        <View style={styles.commentAvatar} />
        <View style={styles.commentTextWrap}>
          <SkeletonBlock style={styles.commentLabel} />
          <SkeletonBlock style={styles.commentText} />
        </View>
      </View>

      <SkeletonBlock style={styles.viewAll} />
    </Card>
  );
};

export const FeedSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <FeedPostSkeleton />
      <FeedPostSkeleton />
      <FeedPostSkeleton />
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
  block: {
    backgroundColor: colors.gray200,
    borderRadius: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray200,
  },
  authorName: {
    width: 120,
    height: 12,
  },
  time: {
    width: 50,
    height: 10,
  },
  contentBlock: {
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  contentLine1: {
    width: "100%",
    height: 10,
  },
  contentLine2: {
    width: "95%",
    height: 10,
  },
  contentLine3: {
    width: "60%",
    height: 10,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  actionChip: {
    width: 60,
    height: 24,
    borderRadius: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray100,
    marginBottom: spacing.md,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.gray200,
  },
  commentTextWrap: {
    flex: 1,
    gap: spacing.xs,
  },
  commentLabel: {
    width: 100,
    height: 10,
  },
  commentText: {
    width: "80%",
    height: 10,
  },
  viewAll: {
    width: 140,
    height: 12,
  },
});
