import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography, commonStyles } from "@theme";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

const HomeScreen: React.FC = () => {
  const { session, logout } = useAuth();
  const profile = session?.user?.profile;
  const fullName = [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <View style={[commonStyles.container, styles.container]}>
      <Text style={styles.title}>Home</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Usuario actual</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{session?.user?.email || "-"}</Text>

        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{session?.user?.id || "-"}</Text>

        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{session?.user?.userType || "-"}</Text>

        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{fullName || "-"}</Text>
      </View>

      <Button
        title="Cerrar sesión"
        onPress={logout}
        variant="outline"
        style={styles.logoutButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    ...typography.h1,
    color: colors.textColors.primary,
    textAlign: "center",
    marginBottom: 18,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textColors.primary,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: colors.textColors.tertiary,
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: colors.textColors.primary,
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 18,
  },
});

export default HomeScreen;
