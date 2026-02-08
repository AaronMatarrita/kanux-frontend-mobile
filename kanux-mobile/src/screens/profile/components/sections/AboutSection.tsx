import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { Card } from "@/components/ui/Card";

export const AboutSection = () => (
  <View style={styles.wrapper}>
    <Card variant="shadow" padding="lg" style={styles.card}>
      <Text style={styles.title}>Acerca de</Text>
      <Text style={styles.text}>
        I am a Senior UI/UX Designer with 6+ years of experience crafting
        digital experiences that are both beautiful and functional.
      </Text>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  card: {
    alignItems: "flex-start",
    borderRadius: 16,
  },
  title: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  text: {
    ...typography.bodySmall,
    color: colors.textColors.secondary,
  },
});
