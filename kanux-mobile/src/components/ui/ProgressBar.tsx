import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import { colors, spacing, typography } from "@/theme";

interface ProgressBarProps {
  progress: number;
  height?: number;
  showLabel?: boolean;
  color?: string;
  backgroundColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  showLabel = false,
  color = colors.emerald600,
  backgroundColor = colors.gray200,
}) => {
  //animations change value
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedWidth, {
      toValue: progress,
      useNativeDriver: false,
      friction: 8,
    }).start();
  }, [progress]);

  // interpolate
  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={[typography.caption, { color: colors.gray600 }]}>
            Progreso
          </Text>
          <Text style={[typography.caption, { fontWeight: "700" }]}>
            {Math.round(progress)}%
          </Text>
        </View>
      )}

      {/* progress bar*/}
      <View
        style={[
          styles.track,
          { height, backgroundColor, borderRadius: height / 2 },
        ]}
      >
        {/* progress animate*/}
        <Animated.View
          style={[
            styles.fill,
            {
              width: widthInterpolated,
              backgroundColor: color,
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: spacing.xs,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  track: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
