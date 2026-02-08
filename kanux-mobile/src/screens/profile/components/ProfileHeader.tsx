import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, typography, spacing } from "@theme";

import { ProfileData } from "../types";

import { Card } from "@/components/ui/Card";

type Props = {
  profile: ProfileData;
  onEditPress: () => void;
};

export default function ProfileHeader({ profile, onEditPress }: Props) {
  return (
    <View style={styles.wrapper}>
      <Card
        variant="shadow"
        padding="lg"
        style={styles.card}
        onPress={onEditPress}
      >
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Aaron Matarrita</Text>
        <Text style={styles.role}>
          Frontend Developer · Backend Developer · FullStack
        </Text>

        <Text style={styles.link}>https://www.google.com/aaronmatarrita</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  card: {
    alignItems: "center",
    borderRadius: 16,
  },
  content: {
    alignItems: "center",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: spacing.md,
  },
  name: {
    ...typography.h3,
    color: colors.textColors.primary,
    textAlign: "center",
  },
  role: {
    ...typography.bodySmall,
    color: colors.textColors.secondary,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  link: {
    ...typography.caption,
    color: colors.info,
    marginTop: spacing.sm,
  },
});
