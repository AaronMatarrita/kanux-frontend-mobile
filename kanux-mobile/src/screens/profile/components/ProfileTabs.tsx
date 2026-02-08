import React from "react";
import { View, StyleSheet } from "react-native";
import { spacing } from "@/theme";
import { Tabs } from "@/components/ui/Tabs";

type Tab = "resume" | "skills" | "activity";

type Props = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

export const ProfileTabs: React.FC<Props> = ({ active, onChange }) => {
  return (
    <View style={styles.container}>
      <Tabs
        tabs={[
          { id: "resume", label: "Resumen" },
          { id: "skills", label: "Habilidades" },
          { id: "activity", label: "Actividad" },
        ]}
        activeTab={active}
        onTabChange={(id) => onChange(id as Tab)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
});
