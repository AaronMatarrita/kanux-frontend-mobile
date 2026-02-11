import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";
import { commonStyles } from "../../../theme/commonStyles";
import type { AnalyticsKpi, BestChallenge } from "../types/home.types";
import { Send, Percent, Award, Building2 } from "lucide-react-native";

type Props = {
  kpis: AnalyticsKpi[];
  bestChallenge: BestChallenge;
  onPressOpenAnalytics?: () => void;
};

const KpiCard = ({ item }: { item: AnalyticsKpi }) => {
  const Icon =
    item.key === "totalSubmissions"
      ? Send
      : item.key === "avgScore"
        ? Percent
        : item.key === "bestScore"
          ? Award
          : Building2;

  return (
    <View
      style={{
        flex: 1,
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
            width: 34,
            height: 34,
            borderRadius: 12,
            backgroundColor: "rgba(59,130,246,0.10)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={18} color={colors.info} />
        </View>

        <Text
          style={[typography.caption, { color: colors.textColors.secondary }]}
        >
          {item.label}
        </Text>
      </View>

      <Text style={[typography.h3, { color: colors.textColors.primary }]}>
        {item.value}
      </Text>

      {!!item.helper && (
        <Text
          style={[
            typography.captionSmall,
            { color: colors.textColors.tertiary, marginTop: spacing.xs },
          ]}
        >
          {item.helper}
        </Text>
      )}
    </View>
  );
};

export const AnalyticsSnapshot: React.FC<Props> = ({
  kpis,
  bestChallenge,
  onPressOpenAnalytics,
}) => {
  return (
    <View>
      <View style={[commonStyles.rowBetween, { marginBottom: spacing.md }]}>
        <View>
          <Text style={[typography.h3, { color: colors.textColors.primary }]}>
            Analítica
          </Text>
          <Text
            style={[
              typography.bodySmall,
              { color: colors.textColors.secondary, marginTop: spacing.xs },
            ]}
          >
            Visualiza tu progreso y resultados.
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={onPressOpenAnalytics}>
          <Text style={[typography.uiSmall, { color: colors.primary }]}>
            Ver todo
          </Text>
        </TouchableOpacity>
      </View>

      {/* KPIs 2x2 */}
      <View style={{ gap: spacing.md }}>
        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <KpiCard item={kpis[0]} />
          <KpiCard item={kpis[1]} />
        </View>
        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <KpiCard item={kpis[2]} />
          <KpiCard item={kpis[3]} />
        </View>
      </View>

      {/* Best challenge highlight (de tu analytics) */}
      <View
        style={{
          marginTop: spacing.lg,
          borderRadius: 20,
          padding: spacing.lg,
          backgroundColor: "rgba(16, 185, 129, 0.10)", // success soft
          borderWidth: 1,
          borderColor: "rgba(16, 185, 129, 0.25)",
        }}
      >
        <View style={[commonStyles.rowBetween, { marginBottom: spacing.sm }]}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <Text
              style={[typography.uiSmall, { color: colors.textColors.primary }]}
            >
              {bestChallenge.title}{" "}
              <Text style={[typography.caption, { color: colors.success }]}>
                {bestChallenge.badge}
              </Text>
            </Text>
            <Text
              style={[
                typography.caption,
                { color: colors.textColors.secondary, marginTop: spacing.xs },
              ]}
            >
              {bestChallenge.subtitle}
            </Text>
          </View>

          <View
            style={{
              minWidth: 56,
              height: 36,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.success,
            }}
          >
            <Text style={[typography.uiSmall, { color: colors.white }]}>
              {bestChallenge.score}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
