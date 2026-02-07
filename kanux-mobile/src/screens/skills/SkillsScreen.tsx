import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSkills } from "./hooks/useSkills";
import { SkillCategoryCard } from "./components/SkillCategoryCard";
import { Tabs } from "@/components/ui/Tabs";
import { typography, colors, commonStyles, spacing } from "@/theme";
import { EmptyState } from "@/components/ui/EmptyState";
import { Header } from "@/components/messages";

const SkillsScreen: React.FC = () => {
  const { activeTab, setActiveTab, tabs, groupedSkillsData } = useSkills();
  
  return (
    <View style={commonStyles.container}>
      <Header title={"Habilidades"} />
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
      {/* scroll */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/*categories simulated*/}
        {groupedSkillsData.length > 0 ? (
          groupedSkillsData.map((item) => (
            <SkillCategoryCard
              key={item.category}
              categoryName={item.category}
              skills={item.skills} // item.skills es ProcessedSkill[]
            />
          ))
        ) : (
          <EmptyState
            title="Aún no has agregado habilidades."
            description="Completa tu perfil."
            iconName="SearchX"
          />
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60, // notch space
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
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  scroll: {
    flex: 1, // use all screen
  },
  scrollContent: {
    // right, left padding
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl, //button space
  },
});

export default SkillsScreen;
