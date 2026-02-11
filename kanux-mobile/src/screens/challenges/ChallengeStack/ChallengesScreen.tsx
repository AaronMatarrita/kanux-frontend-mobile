import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { colors, commonStyles, spacing } from "@theme";
import { Header } from "@/components/messages";
import { Tabs } from "@/components/ui/Tabs";
import { ChallengeCard } from "../components/ChallengeCard";
import { useChallengesList, Challenge, ChallengeSubmission } from "../hooks/useChallengesList";
import { ProgressChallengeCard } from "../components/ChallengeRow";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChallengesStackParamList } from "@/types/navigation";
import { ChallengeListSkeleton } from "../components/ChallengesSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { RetryState } from "@/components/ui/RetryState";


const ChallengesScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengesStackParamList>>();
  const [activeTab, setActiveTab] = useState("challenges");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [history, setHistory] = useState<ChallengeSubmission[]>([]);

  const { loadChallenges, loadHistory, isLoading, error } = useChallengesList();

  const fetchInitialData = async () => {
    const results = await loadChallenges("all", 1, 20);
    if (!results.error) {
      setChallenges([...results.technical, ...results.soft]);
    }
    const data = await loadHistory();
    setHistory(data);
  };
  useEffect(() => {
    fetchInitialData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return <ChallengeListSkeleton isProgress={activeTab === "complete"} />;
    }
    if (error) {
      return (
        <RetryState
          title="Error de conexión"
          message="No logramos conectar con el servidor para obtener los challenges."
          onRetry={() => fetchInitialData()}
        />
      );
    }
    if (activeTab === "challenges") {
      if (!challenges) {
        return (
          <EmptyState
            title="Aún no hay challenges disponibles."
            description="Demuestra tu talento realizando estos desafíos."
            iconName="Zap"
          />
        )
      }
      return (
        <FlatList
          data={challenges}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChallengeCard
              challenge={item}
              onPress={() => navigation.navigate("ChallengeDetail", { challengeId: item.id })}
            />
          )}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          showsVerticalScrollIndicator={false}
        />
      );
    } else {
      if (!history) {
        return (
          <EmptyState
            title="Aún no has completado desafíos."
            description="Demuestra tu talento realizando desafíos."
            iconName="Zap"
          />
        )
      }
      return (
        <FlatList
          data={history}
          keyExtractor={(item) => item.submission_id}
          renderItem={({ item }) => (
            <ProgressChallengeCard
              title={item.challenge.title}
              difficulty={item.challenge.difficulty}
              date={formatDate(item.submitted_at)}
              score={item.score}
              onPress={() => {
                console.log("Detalle", item.submission_id)
                navigation.replace("ChallengeResult", {
                  submissionId: item.submission_id
                });
              }
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  };

  return (
    <View style={[commonStyles.container, { flex: 1 }]}>
      <Header title={"Desafío"} />
      <View style={styles.tabContainer}>
        <Tabs
          tabs={[
            { id: "challenges", label: "Challenges" },
            { id: "complete", label: "Completados" }
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </View>
      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 120,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  subtitle: {
    color: colors.gray500,
    marginTop: spacing.sm,
    textAlign: 'center'
  }
});
export default ChallengesScreen;