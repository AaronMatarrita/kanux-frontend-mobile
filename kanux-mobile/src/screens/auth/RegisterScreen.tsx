import React, { useMemo, useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Lock, Mail } from "lucide-react-native";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { AuthLayout, AuthHeader, AuthFooter } from "./components";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { useAuth } from "@/context/AuthContext";
import type { TalentProfile } from "@/types/session.types";

type Props = NativeStackScreenProps<any, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const { login } = useAuth();
  const {
    values: { email, password, confirmPassword },
    setEmail,
    setPassword,
    setConfirmPassword,
    loading,
    canSubmit,
    passwordError,
    confirmPasswordError,
    emailError,
    onBlurEmail,
    onBlurPassword,
    onBlurConfirmPassword,
    handleSubmit,
    submitError,
    setSubmitError,
  } = useRegisterForm({
    onSuccess: async (data) => {
      const emptyProfile: TalentProfile = {
        id: "",
        id_user: data.user,
        first_name: null,
        last_name: null,
        title: null,
        bio: null,
        location: null,
        skills: null,
        photo_url: null,
        created_at: new Date().toISOString(),
      };

      await login({
        isAuthenticated: false,
        token: data.token,
        sessionId: data.sessionId,
        user: {
          id: data.user,
          email,
          userType: "talent",
          profile: emptyProfile,
        },
      });

      Alert.alert("Éxito", "Cuenta creada. Continúa con tu perfil.");
      navigation.replace("CompleteProfile");
    },
    onError: (error) => {
      Alert.alert("Error", error);
    },
  });

  useEffect(() => {
    if (submitError) {
      Alert.alert("Error", submitError);
      setSubmitError(undefined);
    }
  }, [submitError, setSubmitError]);

  const checks = useMemo(() => {
    const p = password ?? "";
    const hasMin = p.length >= 8;
    const hasUpper = /[A-Z]/.test(p);
    const hasLower = /[a-z]/.test(p);
    return { hasMin, hasUpper, hasLower };
  }, [password]);

  return (
    <AuthLayout>
      <AuthHeader
        title="Bienvenido"
        subtitle="Crea tu cuenta para comenzar tu crecimiento"
      />

      <TextField
        value={email}
        onChangeText={setEmail}
        onBlur={onBlurEmail}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={Mail}
        error={emailError}
      />

      <TextField
        value={password}
        onChangeText={setPassword}
        onBlur={onBlurPassword}
        placeholder="Ingresa tu contraseña"
        secureTextEntry
        leftIcon={Lock}
        error={passwordError}
      />

      <TextField
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onBlur={onBlurConfirmPassword}
        placeholder="Confirma tu contraseña"
        secureTextEntry
        leftIcon={Lock}
        error={confirmPasswordError}
      />

      <View style={styles.rules}>
        <Rule ok={checks.hasMin} text="Al menos 8 caracteres" />
        <Rule
          ok={checks.hasUpper && checks.hasLower}
          text="Mayúsculas y minúsculas"
        />
      </View>

      <Button
        title="Crear cuenta"
        onPress={handleSubmit}
        disabled={!canSubmit || loading}
        variant="success"
        style={{ marginTop: 24 }}
      />

      <AuthFooter
        text="¿Ya tienes cuenta?"
        linkText="Inicia sesión"
        onLinkPress={() => navigation.navigate("Login")}
      />
    </AuthLayout>
  );
}

function Rule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <View style={styles.ruleRow}>
      <View style={[styles.dot, ok ? styles.dotOk : styles.dotNo]} />
      <Text style={[styles.ruleText, ok ? styles.ruleOk : styles.ruleNo]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rules: {
    marginTop: 10,
    gap: 8,
  },
  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  dotOk: { backgroundColor: "#34D399" },
  dotNo: { backgroundColor: "rgba(255,255,255,0.35)" },
  ruleText: { fontSize: 12 },
  ruleOk: { color: "#D1FAE5" },
  ruleNo: { color: "rgba(255,255,255,0.75)" },
});
