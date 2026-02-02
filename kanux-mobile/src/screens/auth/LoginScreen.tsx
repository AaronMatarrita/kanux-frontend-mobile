import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SvgUri } from "react-native-svg";
import { Asset } from "expo-asset";
import { colors } from "@/theme/colors";
import { Lock, Mail } from "lucide-react-native";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { useLoginForm } from "@/screens/auth/hooks/useLoginForm";

type Props = NativeStackScreenProps<any, "Login">;

const logoUri = Asset.fromModule(
  require("../../../assets/brand/kanux-logo.svg"),
).uri;

export default function LoginScreen({ navigation }: Props) {
  const {
    values,
    setEmail,
    setPassword,
    loading,
    canSubmit,
    emailError,
    passwordError,
    onBlurEmail,
    onBlurPassword,
    handleSubmit,
  } = useLoginForm({
    onSubmit: async (payload) => {
      console.log("login payload", payload);
      Alert.alert(
        "Inicio de sesión pendiente",
        "La conexión real se implementará más adelante.",
      );
    },
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <SvgUri uri={logoUri} width={180} height={52} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.welcome}>Bienvenido</Text>
        <Text style={styles.subtitle}>
          Inicia sesión para continuar tu crecimiento
        </Text>

        <View style={styles.dividerRow}></View>

        <TextField
          value={values.email}
          onChangeText={setEmail}
          onBlur={onBlurEmail}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={Mail}
          error={emailError}
        />

        <TextField
          value={values.password}
          onChangeText={setPassword}
          onBlur={onBlurPassword}
          placeholder="Ingresa tu contraseña"
          secureTextEntry
          leftIcon={Lock}
          error={passwordError}
        />

        <Pressable onPress={() => console.log("forgot password")}>
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </Pressable>

        <Button
          title={loading ? "Iniciando sesión..." : "Iniciar sesión"}
          onPress={handleSubmit}
          disabled={!canSubmit}
          variant="success"
          style={{ marginTop: 18 }}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>¿No tienes cuenta? </Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={styles.footerLink}>Crea una</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  top: {
    height: 190,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  logoBox: {
    height: 60,
    width: 220,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { color: colors.muted, fontWeight: "600" },

  panel: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 22,
    paddingTop: 28,
    borderTopLeftRadius: 90,
  },

  welcome: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.success,
    textAlign: "center",
    marginTop: 6,
  },
  subtitle: {
    color: colors.white,
    opacity: 0.85,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  dividerText: {
    color: colors.white,
    opacity: 0.85,
    fontSize: 12,
  },

  forgot: {
    color: colors.white,
    opacity: 0.85,
    textAlign: "right",
    marginTop: 2,
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },
  footerText: { color: colors.white, opacity: 0.8 },
  footerLink: { color: "#34D399", fontWeight: "700" },
});
