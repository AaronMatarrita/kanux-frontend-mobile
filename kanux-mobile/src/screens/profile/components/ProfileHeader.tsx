import React from "react";
import { Image, Text, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { EditButton } from "@/components/ui/EditButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { colors } from "@/theme";
import { ProfileData } from "../types";
import styles from "../styles/profileHeader.styles";

type Props = {
  profile: ProfileData;
  onEditPress: () => void;
};

export default function ProfileHeader({ profile, onEditPress }: Props) {
  const website =
    profile.basicInfo.website ??
    profile.contacts?.find((c) => c.type === "Website")?.value;
  const completion = Math.min(100, Math.max(0, profile.completion.percentage));
  const showMotivation = completion < 100;

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

        <Text style={styles.name}>{profile.basicInfo.fullName}</Text>

        {!!profile.basicInfo.headline && (
          <Text style={styles.role}>{profile.basicInfo.headline}</Text>
        )}

        {!!website && <Text style={styles.link}>{website}</Text>}

        <View style={styles.progressBlock}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Completitud</Text>
            <Text style={styles.progressValue}>{Math.round(completion)}%</Text>
          </View>
          <ProgressBar
            progress={completion}
            height={6}
            color={colors.emerald600}
            backgroundColor={colors.gray200}
          />
          {showMotivation && (
            <Text style={styles.progressHint}>
              Completa tu perfil para aumentar tus oportunidades
            </Text>
          )}
        </View>
      </Card>
    </View>
  );
}
