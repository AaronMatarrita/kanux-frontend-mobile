import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, typography, spacing } from "@theme";
import { Card } from "@/components/ui/Card";
import { EditButton } from "@/components/ui/EditButton";
import { ProfileData } from "../types";

type Props = {
  profile: ProfileData;
  onEditPress: () => void;
};

export default function ProfileHeader({ profile, onEditPress }: Props) {
  return (
    <View style={styles.wrapper}>
      <Card variant="shadow" padding="lg" style={styles.card}>
        <View style={styles.editWrapper}>
          <EditButton onPress={onEditPress} />
        </View>

        <Image
          source={{ uri: profile?.avatarUrl ?? "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Aaron Matarrita</Text>

        <Text style={styles.role}>
          Frontend Developer · Backend Developer · FullStack
        </Text>

        <Text style={styles.link}>https://example.com</Text>
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
    borderRadius: 16,
  },

  editWrapper: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    zIndex: 1,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: spacing.md,
    alignSelf: "center",
    marginTop: spacing.sm,
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
    textAlign: "center",
  },
});
