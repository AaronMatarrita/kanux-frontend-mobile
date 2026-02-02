import React, { useState, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Lock, Mail, User } from "lucide-react-native";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { AuthLayout, AuthHeader, AuthFooter } from "./components";

type Props = NativeStackScreenProps<any, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        value={name}
        onChangeText={setName}
        placeholder="Tu nombre"
        autoCapitalize="words"
        leftIcon={User}
      />

      <TextField
        value={email}
        onChangeText={setEmail}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={Mail}
      />

      <TextField
        value={password}
        onChangeText={setPassword}
        placeholder="Ingresa tu contraseña"
        secureTextEntry
        leftIcon={Lock}
      />

      <TextField
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirma tu contraseña"
        secureTextEntry
        leftIcon={Lock}
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
        onPress={() => console.log("Registro pendiente")}
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
