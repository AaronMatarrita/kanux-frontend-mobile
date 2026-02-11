import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography, spacing } from "@theme";

interface StepIndicatorProps {
  steps: string[];
  activeIndex: number;
}

export function StepIndicator({ steps, activeIndex }: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {steps.map((label, index) => {
          const isActive = index === activeIndex;
          const isDone = index < activeIndex;

          return (
            <React.Fragment key={`${label}-${index}`}>
              <View
                style={[
                  styles.circle,
                  isActive && styles.circleActive,
                  isDone && styles.circleDone,
                ]}
              >
                <Text
                  style={[
                    styles.circleText,
                    (isActive || isDone) && styles.circleTextActive,
                  ]}
                >
                  {index + 1}
                </Text>
              </View>

              {index < steps.length - 1 && (
                <View
                  style={[styles.connector, isDone && styles.connectorDone]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    gap: spacing.sm,
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  circleActive: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  circleDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  circleText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "700",
  },
  circleTextActive: {
    color: colors.primary,
  },
  connector: {
    height: 2,
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: spacing.xs,
  },
  connectorDone: {
    backgroundColor: colors.success,
  },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  labelItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: spacing.xs,
  },
  stepLabel: {
    ...typography.caption,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    lineHeight: 14,
    minHeight: 28,
  },
  stepLabelActive: {
    color: colors.white,
    fontWeight: "600",
  },
  stepLabelHidden: {
    color: "transparent",
  },
});
