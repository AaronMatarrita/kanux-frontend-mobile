import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, spacing } from "@/theme";

type BlockProps = {
  style?: any;
};

const SkeletonBlock: React.FC<BlockProps> = ({ style }) => (
  <View style={[styles.block, style]} />
);

export const BillingSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Subtitle skeleton */}
      <SkeletonBlock style={styles.subtitle} />

      {/* Current plan details skeleton */}
      <View style={styles.card}>
        <SkeletonBlock style={styles.cardTitle} />
        <View style={styles.detailRow}>
          <SkeletonBlock style={styles.detailLabel} />
          <SkeletonBlock style={styles.detailValue} />
        </View>
        <View style={styles.detailRow}>
          <SkeletonBlock style={styles.detailLabel} />
          <SkeletonBlock style={styles.detailValue} />
        </View>
        <View style={styles.detailRow}>
          <SkeletonBlock style={styles.detailLabel} />
          <SkeletonBlock style={styles.detailValue} />
        </View>
        <View style={styles.detailRow}>
          <SkeletonBlock style={styles.detailLabel} />
          <SkeletonBlock style={styles.detailValue} />
        </View>
      </View>

      {/* Plan cards skeleton */}
      {[1, 2, 3].map((index) => (
        <View key={index} style={styles.planCard}>
          <View style={styles.planHeader}>
            <SkeletonBlock style={styles.planName} />
          </View>
          <SkeletonBlock style={styles.planPrice} />
          <SkeletonBlock style={styles.planDescription} />
          <SkeletonBlock style={styles.planDescriptionShort} />
          
          <View style={styles.featuresContainer}>
            {[1, 2, 3].map((i) => (
              <View key={i} style={styles.featureRow}>
                <SkeletonBlock style={styles.featureIcon} />
                <SkeletonBlock style={styles.featureText} />
              </View>
            ))}
          </View>

          <SkeletonBlock style={styles.planButton} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  block: {
    backgroundColor: colors.gray200,
    borderRadius: 8,
  },
  subtitle: {
    width: "85%",
    height: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  cardTitle: {
    width: "60%",
    height: 18,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLabel: {
    width: "40%",
    height: 14,
  },
  detailValue: {
    width: "35%",
    height: 14,
  },
  planCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  planName: {
    width: "35%",
    height: 20,
  },
  planPrice: {
    width: "45%",
    height: 28,
    marginBottom: 12,
  },
  planDescription: {
    width: "100%",
    height: 14,
    marginBottom: 8,
  },
  planDescriptionShort: {
    width: "75%",
    height: 14,
    marginBottom: 16,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
  },
  featureText: {
    width: "60%",
    height: 14,
  },
  planButton: {
    width: "100%",
    height: 48,
    borderRadius: 12,
  },
});
