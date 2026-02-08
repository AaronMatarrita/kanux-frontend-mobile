import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { typography, colors, spacing } from "@/theme";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              activeOpacity={0.8}
              style={[styles.tab, isActive && styles.tabActive]}
            >
              <Text
                style={[styles.tabText, isActive && styles.tabTextActive]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: spacing.xs,
  },
  wrapper: {
    flexDirection: "row",
    width: "100%",
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: colors.emerald600,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabText: {
    ...typography.bodySmall,
    color: "#475569",
    fontWeight: "500",
  },
  tabTextActive: {
    color: colors.white,
    fontWeight: "600",
  },
});
