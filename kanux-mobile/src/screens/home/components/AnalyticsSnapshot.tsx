import React, { useMemo, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  Animated,
} from "react-native";
import {
  Send,
  Percent,
  Award,
  Building2,
  ArrowRight,
  TrendingUp,
} from "lucide-react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";
import { commonStyles } from "../../../theme/commonStyles";
import type { AnalyticsKpi, BestChallenge } from "../types/home.types";

type Props = {
  kpis: AnalyticsKpi[];
  bestChallenge: BestChallenge;
  onPressOpenAnalytics?: () => void;
};

const KpiCard = ({ item, delay }: { item: AnalyticsKpi; delay: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim, delay]);

  const Icon =
    item.key === "totalSubmissions"
      ? Send
      : item.key === "avgScore"
        ? Percent
        : item.key === "bestScore"
          ? Award
          : Building2;

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View
        style={{
          borderRadius: 18,
          padding: spacing.lg,
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.gray200,
          ...commonStyles.shadow,
        }}
      >
        <View style={[commonStyles.rowBetween, { marginBottom: spacing.sm }]}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              backgroundColor: "rgba(59,130,246,0.10)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={18} color="#3b82f6" />
          </View>

          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              color: colors.textColors.secondary,
            }}
          >
            {item.label}
          </Text>
        </View>

        <Text
          style={[
            typography.h3,
            { color: colors.textColors.primary, fontWeight: "700" },
          ]}
        >
          {item.value}
        </Text>

        {!!item.helper && (
          <Text
            style={{
              fontSize: 10,
              color: colors.textColors.tertiary,
              marginTop: spacing.xs,
            }}
          >
            {item.helper}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

export const AnalyticsSnapshot: React.FC<Props> = ({
  kpis,
  bestChallenge,
  onPressOpenAnalytics,
}) => {
  const { width } = useWindowDimensions();

  const columns = useMemo(() => {
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    return 2;
  }, [width]);

  const cardWidth = useMemo(() => {
    const horizontalPadding = spacing.lg * 2;
    const totalGutters = spacing.md * (columns - 1);
    const usable = Math.max(0, width - horizontalPadding - totalGutters);
    return usable / columns;
  }, [columns, width]);

  return (
    <View>
      {/* Section header */}
      <View style={[commonStyles.rowBetween, { marginBottom: spacing.md }]}>
        <View>
          <Text
            style={[
              typography.h3,
              {
                color: colors.textColors.primary,
                fontWeight: "700",
                fontSize: 16,
              },
            ]}
          >
            Analitica
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.textColors.secondary,
              marginTop: 2,
            }}
          >
            Visualiza tu progreso y resultados.
          </Text>
        </View>
      </View>

      {/* KPI Grid */}
      <View style={styles.kpiWrap}>
        {kpis.map((k, idx) => (
          <View
            key={k.key}
            style={{
              width: cardWidth,
              marginRight: (idx + 1) % columns === 0 ? 0 : spacing.md,
              marginBottom: spacing.md,
            }}
          >
            <KpiCard item={k} delay={300 + idx * 80} />
          </View>
        ))}
      </View>

      {/* Best challenge highlight */}
      <View
        style={{
          marginTop: spacing.md,
          borderRadius: 20,
          padding: spacing.lg,
          backgroundColor: "rgba(16, 185, 129, 0.08)",
          borderWidth: 1,
          borderColor: "rgba(16, 185, 129, 0.25)",
          overflow: "hidden",
        }}
      >
        <View style={[commonStyles.rowBetween]}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            {/* Label with icon */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
              }}
            >
              <TrendingUp size={14} color="#10b981" />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  color: "#10b981",
                }}
              >
                Mejor resultado
              </Text>
            </View>

            <Text
              style={[
                typography.uiSmall,
                {
                  color: colors.textColors.primary,
                  fontWeight: "600",
                  fontSize: 13,
                },
              ]}
            >
              {bestChallenge.title}{" "}
              <Text style={{ fontWeight: "400", color: "#10b981" }}>
                {bestChallenge.badge}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: colors.textColors.secondary,
                marginTop: 2,
              }}
            >
              {bestChallenge.subtitle}
            </Text>
          </View>

          <View
            style={{
              minWidth: 56,
              height: 40,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.success,
              paddingHorizontal: 12,
              shadowColor: "#10b981",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: colors.white,
              }}
            >
              {bestChallenge.score}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  kpiWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
