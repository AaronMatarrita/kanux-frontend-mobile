import React, { useMemo } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChallengesStackParamList } from "@/types/navigation";
import { ChallengesPreview } from "./components/ChallengesPreview";
import { SafeAreaView, ScrollView, View, StatusBar } from "react-native";
import { homeStyles } from "./styles/home.styles";
import { spacing } from "../../theme/spacing";
import { HomeHero } from "./components/HomeHero";
import { StatsGrid } from "./components/StatsGrid";
import { useHomeData } from "./hooks/useHomeData";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { TabNavigatorParamList } from "@navigation";

export default function HomeScreen() {
  const navigation =
    useNavigation<BottomTabNavigationProp<TabNavigatorParamList>>();
  const { session } = useAuth();
  const {
    profile,
    stats,
    analyticsKpis,
    bestChallenge,
    recommended,
    loading,
    error,
  } = useHomeData();

  const realName = useMemo(() => {
    const first = profile?.first_name ?? session?.user?.profile?.first_name;
    const last = profile?.last_name ?? session?.user?.profile?.last_name;
    const email = session?.user?.email;

    if (first && last) return `${first} ${last}`;
    return first || last || email || "Usuario";
  }, [
    profile?.first_name,
    profile?.last_name,
    session?.user?.profile,
    session?.user?.email,
  ]);

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
            loading={loading}
            onPressStat={(key) => console.log("Stat pressed", key)}
          />

          <View style={{ marginTop: 32 }}>
            <ChallengesPreview
              items={recommended}
              totalAvailableText={`Últimos ${recommended.length} desafíos`}
              onPressChallenge={(id) =>
                navigation.navigate("Challenges", {
                  screen: "ChallengeDetail",
                  params: { challengeId: id },
                } as never)
              }
              onPressSeeMore={() =>
                navigation.navigate("Challenges", {
                  screen: "ChallengesList",
                } as never)
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
