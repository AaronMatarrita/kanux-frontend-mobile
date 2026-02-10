import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, typography } from "@/theme";
import { Card } from "@/components/ui/Card";
import { Ionicons } from "@expo/vector-icons";

type SettingItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  badge?: string;
};

type Props = {
  onBillingPress: () => void;
};

export const SettingsSection: React.FC<Props> = ({ onBillingPress }) => {
  const settings: SettingItem[] = [
    {
      id: "billing",
      label: "Planes y suscripción",
      icon: "card-outline",
      onPress: onBillingPress,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Card variant="shadow" padding="lg" style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Configuración de cuenta</Text>
        </View>

        <View style={styles.itemsContainer}>
          {settings.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                index === settings.length - 1 && styles.itemLast,
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={20} color={colors.primary} />
                </View>
                <Text style={styles.itemLabel}>{item.label}</Text>
              </View>

              <View style={styles.itemRight}>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textColors.tertiary}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    padding: 0,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  title: {
    ...typography.body,
    fontWeight: "600",
    color: colors.textColors.primary,
  },
  itemsContainer: {
    marginTop: -spacing.lg,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
    backgroundColor: colors.white,
  },
  itemLast: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primaryLight + "20",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  itemLabel: {
    ...typography.body,
    color: colors.textColors.primary,
    fontWeight: "500",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: "600",
    fontSize: 11,
  },
});
