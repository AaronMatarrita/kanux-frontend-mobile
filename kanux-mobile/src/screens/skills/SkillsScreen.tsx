import { View, StyleSheet, ScrollView } from "react-native";

// hooks
import { useSkills } from "./hooks/useSkills";
//components
import { SkillCategoryCard } from "./components/SkillCategoryCard";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Header } from "@/components/messages";

//styles
import { typography, colors, commonStyles, spacing } from "@/theme";

// navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabNavigatorParamList } from "@/types/navigation";

const SkillsScreen: React.FC = () => {
  const { activeTab, setActiveTab, tabs, groupedSkillsData } = useSkills();
  const navigation = useNavigation<NativeStackNavigationProp<TabNavigatorParamList>>();

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
            description="Parece que tu perfil aún está en crecimiento. Agrega tus habilidades para que las empresas te encuentren."
            iconName="SearchX"
            buttonTitle="Completa tu perfil"
            onButtonPress={() => navigation.navigate('Profile')}
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
