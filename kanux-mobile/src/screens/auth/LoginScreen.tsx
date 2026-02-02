import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Lock, Mail } from "lucide-react-native";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { colors } from "@/theme/colors";
import { useLoginForm } from "@/screens/auth/hooks/useLoginForm";
import { authService } from "@/services";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Alert } from "react-native";
import { AuthLayout, AuthHeader, AuthFooter } from "./components";

type Props = NativeStackScreenProps<any, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
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
      try {
        const response = await authService.login(payload);

        await login({
          isAuthenticated: true,
          token: response.token,
          sessionId: response.sessionId,
          user: response.user,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "No se pudo iniciar sesión. Verificá tus credenciales.";
          Alert.alert("Error de inicio de sesión", message);
          return;
        }

        Alert.alert(
          "Error de inicio de sesión",
          "Ocurrió un error inesperado.",
        );
      }
    },
  });

  return (
    <AuthLayout>
      <AuthHeader
        title="Bienvenido"
        subtitle="Inicia sesión para continuar tu crecimiento"
      />

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
        style={{ marginTop: 24 }}
      />

      <AuthFooter
        text="¿No tienes cuenta?"
        linkText="Crea una"
        onLinkPress={() => navigation.navigate("Register")}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  forgot: {
    color: colors.white,
    opacity: 0.85,
    textAlign: "right",
    marginTop: 2,
  },
});
