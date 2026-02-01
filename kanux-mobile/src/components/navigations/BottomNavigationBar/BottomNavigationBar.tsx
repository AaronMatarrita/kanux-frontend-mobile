import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  Home,
  LayoutList,
  Trophy,
  MessageCircle,
  User,
} from "lucide-react-native";
import { colors, spacing, typography } from "@theme";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TABS = [
  { name: "Home", label: "Home", Icon: Home },
  { name: "Feed", label: "Feed", Icon: LayoutList },
  { name: "Challenges", label: "Challenges", Icon: Trophy },
  { name: "Messages", label: "Chat", Icon: MessageCircle },
  { name: "Profile", label: "Profile", Icon: User },
];

const BottomNavigationBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const tab = TABS.find((t) => t.name === route.name);
        if (!tab) return null;

        const { Icon } = tab;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Icon
              size={24}
              color={isFocused ? colors.primary : colors.gray400}
              strokeWidth={1.5}
            />
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
    paddingVertical: spacing.sm,
    paddingBottom: spacing.md,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: spacing.sm,
  },
  label: {
    ...typography.captionSmall,
    color: colors.gray400,
    marginTop: spacing.xs,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: "600" as const,
  },
});

export default BottomNavigationBar;
