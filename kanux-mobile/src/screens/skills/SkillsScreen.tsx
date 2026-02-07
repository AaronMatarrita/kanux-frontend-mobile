import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSkills } from "./hooks/useSkills";
import { SkillCategoryCard } from "./components/SkillCategoryCard";
import { Tabs } from "@/components/ui/Tabs";
import { typography, colors, commonStyles, spacing } from "@/theme";

const SkillsScreen: React.FC = () => {
  const { activeTab, setActiveTab, tabs, groupedSkillsData } = useSkills();

  const tabSelect = activeTab as keyof typeof groupedSkillsData;
  return (
    <View style={commonStyles.container}>

      {/* header*/}
      <View style={styles.header}>
        <Text style={styles.title}>Habilidades</Text>
        <Text style={styles.subtitle}>Vista Habilidades</Text>
        <View style={styles.tabContainer}>
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
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
          <Text>No se encontraron habilidades en esta categoría.</Text>
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
