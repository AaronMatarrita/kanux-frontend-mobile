import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { colors, typography, commonStyles, spacing } from "@theme";
import { Header } from "@/components/messages";
import { Tabs } from "@/components/ui/Tabs";
import { ChallengeCard } from "../components/ChallengeCard";
import { useChallengesList, Challenge } from "../hooks/useChallengesList";
import { ProgressChallengeCard } from "../components/ChallengeRow";


const MOCK_COMPLETED_CHALLENGES = [
  {
    id: 'c1',
    title: 'Suma de Dos Números',
    difficulty: 'Básico',
    date: '28 de enero de 2026, 19:38',
    score: 100,
    type: 'technical'
  },
  {
    id: 'c2',
    title: 'Eliminar Duplicados de un Array',
    difficulty: 'Avanzado',
    date: '28 de enero de 2026, 01:03',
    score: 100,
    type: 'technical'
  },
  {
    id: 'c3',
    title: 'Secuencia de Fibonacci',
    difficulty: 'Intermedio',
    date: '28 de enero de 2026, 00:51',
    score: 100,
    type: 'technical'
  },
  {
    id: 'c4',
    title: 'Verificador de Palíndromos',
    difficulty: 'Intermedio',
    date: '28 de enero de 2026, 00:50',
    score: 100,
    type: 'technical'
  },
  {
    id: 'c5',
    title: 'Invertir una Cadena',
    difficulty: 'Básico',
    date: '28 de enero de 2026, 00:47',
    score: 100,
    type: 'technical'
  },
  {
    id: 'c6',
    title: 'Trabajo en equipo bajo presión',
    difficulty: 'Intermedio',
    date: '17 de enero de 2026, 20:33',
    score: 93,
    type: 'soft'
  },
  {
    id: 'c7',
    title: 'Resolución de Conflictos',
    difficulty: 'Avanzado',
    date: '15 de enero de 2026, 14:20',
    score: 85,
    type: 'soft'
  },
  {
    id: 'c8',
    title: 'Liderazgo Proactivo',
    difficulty: 'Intermedio',
    date: '10 de enero de 2026, 09:15',
    score: 100,
    type: 'soft'
  }
];


const ChallengesScreen: React.FC = () => {

  const [activeTab, setActiveTab] = useState("challenges");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const { loadChallenges, isLoading } = useChallengesList();
  useEffect(() => {
    const fetchChallenges = async () => {
      const type = activeTab === "challenges" ? "all" : "technical";
      const results = await loadChallenges(type, 1, 20);
      if (!results.error) {
        setChallenges([...results.technical, ...results.soft]);
      }
    };

    fetchChallenges();
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "challenges":
        return (
          <FlatList
            data={challenges}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ChallengeCard challenge={item} onPress={(id: string) => { console.info(`id ${id}`) }} />
            )}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
            showsVerticalScrollIndicator={false}
          />
        );

      case "complete":
        return (
          <FlatList
            data={MOCK_COMPLETED_CHALLENGES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProgressChallengeCard
                title={item.title}
                difficulty={item.difficulty}
                date={item.date}
                score={item.score}
                onPress={() => console.log("Detalle de completado", item.id)}
              />
            )}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
            showsVerticalScrollIndicator={false}
          />
        )

      default:
        return null;
    }
  };

  return (
    <View style={[commonStyles.container, { flex: 1 }]}>
      <Header title={"Habilidades"} />

      <View style={styles.tabContainer}>
        <Tabs
          tabs={[
            { id: "challenges", label: "Challenges" },
            { id: "complete", label: "Completados" }
          ]}
          activeTab={activeTab}
          onTabChange={(id) => {
            console.log("Cambiando a tab:", id);
            setActiveTab(id);
          }}
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