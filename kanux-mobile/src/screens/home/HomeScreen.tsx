import React from "react";
import { SafeAreaView, ScrollView, View, StatusBar } from "react-native";
import { homeStyles } from "./styles/home.styles";
import { spacing } from "../../theme/spacing";
import { HomeHero } from "./components/HomeHero";
import { StatsGrid } from "./components/StatsGrid";
import { AnalyticsSnapshot } from "./components/AnalyticsSnapshot";
import { ChallengesPreview } from "./components/ChallengesPreview";
import { useHomeMock } from "./hooks/useHomeMock";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const { session } = useAuth();
  const { stats, analyticsKpis, bestChallenge, recommended } = useHomeMock();

  const realName =
    session?.user?.profile?.first_name && session?.user?.profile?.last_name
      ? `${session.user.profile.first_name} ${session.user.profile.last_name}`
      : session?.user?.profile?.first_name ||
        session?.user?.profile?.last_name ||
        session?.user?.email ||
        "Usuario";

  return (
    <SafeAreaView style={homeStyles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={homeStyles.scrollContent}
        contentInsetAdjustmentBehavior="never"
      >
        <HomeHero
          userName={realName}
          onPressNotifications={() => console.log("Notifications")}
        />

        <View style={homeStyles.floatingArea}>
          <StatsGrid
            stats={stats}
            onPressStat={(key) => console.log("Stat pressed", key)}
          />

          <View style={{ marginTop: spacing.xl }}>
            <AnalyticsSnapshot
              kpis={analyticsKpis}
              bestChallenge={bestChallenge}
              onPressOpenAnalytics={() => console.log("Go to Analytics")}
            />
          </View>

          <View style={{ marginTop: spacing.xl }}>
            <ChallengesPreview
              items={recommended}
              totalAvailableText="5 disponibles"
              onPressSeeMore={() => console.log("Go to challenges")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
