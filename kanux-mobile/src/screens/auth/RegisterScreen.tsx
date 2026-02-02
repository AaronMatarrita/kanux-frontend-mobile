import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SvgUri } from "react-native-svg";
import { Asset } from "expo-asset";
import { colors } from "@/theme/colors";
import { Lock, Mail, User } from "lucide-react-native";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";

type Props = NativeStackScreenProps<any, "Register">;

const logoUri = Asset.fromModule(
  require("../../../assets/brand/kanux-logo.svg"),
).uri;

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
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <SvgUri uri={logoUri} width={180} height={52} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.subtitle}>
          Crea tu cuenta para iniciar tu journey
        </Text>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>O regístrate con email</Text>
          <View style={styles.dividerLine} />
        </View>

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
          title="Sign up"
          onPress={() => console.log("Registro pendiente")}
          variant="success"
          style={{ marginTop: 14 }}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.footerLink}>Inicia sesión</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
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
  safe: { flex: 1, backgroundColor: colors.background },

  top: {
    height: 190,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

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
    color: "#2EAA50",
    textAlign: "center",
    marginTop: 6,
  },
  subtitle: {
    color: colors.white,
    opacity: 0.85,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 14,
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

  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },
  footerText: { color: colors.white, opacity: 0.8 },
  footerLink: { color: "#34D399", fontWeight: "700" },
});
