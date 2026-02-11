import { View, StyleSheet, ScrollView } from "react-native";

// hooks
import { useSkills } from "./hooks/useSkills";
//components
import { SkillCategoryCard } from "./components/SkillCategoryCard";
import { SkillsSkeleton } from "./components/SkillsSkeleton";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Header } from "@/components/messages";

//styles
import { typography, colors, commonStyles, spacing } from "@/theme";

// navigation
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabNavigatorParamList } from "@/types/navigation";

const SkillsScreen: React.FC = () => {
  const { activeTab, setActiveTab, tabs, groupedSkillsData, loading } =
    useSkills();
  const navigation =
    useNavigation<NativeStackNavigationProp<TabNavigatorParamList>>();

  return (
    <View style={commonStyles.container}>
      <Header title={"Habilidades"} />

      <View style={styles.tabContainer}>
        {loading ? (
          <View style={styles.tabsSkeletonRow}>
            <View style={styles.tabSkeleton} />
            <View style={styles.tabSkeleton} />
          </View>
        ) : (
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <SkillsSkeleton hideTabs />
        ) : groupedSkillsData.length > 0 ? (
          groupedSkillsData.map((item) => (
            <SkillCategoryCard
              key={item.category}
              categoryName={item.category}
              skills={item.skills}
            />
          ))
        ) : (
          <EmptyState
            title="Aún no has agregado habilidades."
            description="Parece que tu perfil aún está en crecimiento. Agrega tus habilidades para que las empresas te encuentren."
            iconName="SearchX"
            buttonTitle="Completa tu perfil"
            onButtonPress={() => navigation.navigate("Profile")}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    backgroundColor: colors.backgrounds.primary,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.gray500,
    marginBottom: spacing.md,
  },
  tabContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
  tabsSkeletonRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  tabSkeleton: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray200,
  },
});

export default SkillsScreen;
