import React from "react";
import { Image, Text, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { EditButton } from "@/components/ui/EditButton";
import { ProfileData } from "../types";
import styles from "../styles/profileHeader.styles";

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
