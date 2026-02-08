import React from "react";
import { View, Text } from "react-native";
import { Card } from "@/components/ui/Card";
import { EditButton } from "@/components/ui/EditButton";
import styles from "../../styles/aboutSection.styles";

type Props = {
  onEditPress: () => void;
};

export const AboutSection: React.FC<Props> = ({ onEditPress }) => (
  <View style={styles.wrapper}>
    <Card variant="shadow" padding="lg" style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Acerca de</Text>
        <EditButton onPress={onEditPress} />
      </View>

      <Text style={styles.text}>
        I am a Senior UI/UX Designer with 6+ years of experience crafting
        digital experiences that are both beautiful and functional.
      </Text>
    </Card>
  </View>
);
