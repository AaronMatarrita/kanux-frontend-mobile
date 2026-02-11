import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import {
  StepIndicator,
  OnboardingSectionCard,
  OnboardingHeader,
} from "./components";
import { spacing, typography, colors } from "@theme";
import { useCompleteProfileForm } from "./hooks/useCompleteProfileForm";
import type { RootNavigatorParamList } from "@/types/navigation";

const STEP_LABELS = ["Registro", "Datos personales", "Datos profesionales"];

export default function CompleteProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigatorParamList>>();
  const {
    values,
    setField,
    onBlurField,
    getFieldError,
    profileStep,
    canContinue,
    handleBack,
    handleContinue,
    submitting,
    submitProfile,
  } = useCompleteProfileForm();

  const headerSubtitle =
    profileStep === 0
      ? "Completa tus datos personales para activar tu perfil."
      : "Agrega tu información profesional para mejorar tu visibilidad.";

  const stepLabel = `Paso ${profileStep + 2} de ${STEP_LABELS.length}`;

  const personalFields = [
    {
      key: "firstName",
      label: "Nombres",
      placeholder: "John",
      value: values.firstName,
      onChangeText: (text: string) => setField("firstName", text),
      onBlur: () => onBlurField("firstName"),
      error: getFieldError("firstName"),
      autoCapitalize: "words" as const,
    },
    {
      key: "lastName",
      label: "Apellidos",
      placeholder: "Doe",
      value: values.lastName,
      onChangeText: (text: string) => setField("lastName", text),
      onBlur: () => onBlurField("lastName"),
      error: getFieldError("lastName"),
      autoCapitalize: "words" as const,
    },
    {
      key: "contact",
      label: "Contacto",
      placeholder: "+506 0000-0000",
      value: values.contact,
      onChangeText: (text: string) => setField("contact", text),
      onBlur: () => onBlurField("contact"),
      error: getFieldError("contact"),
      keyboardType: "phone-pad" as const,
    },
    {
      key: "location",
      label: "Ubicación",
      placeholder: "San Jose, Costa Rica",
      value: values.location,
      onChangeText: (text: string) => setField("location", text),
      onBlur: () => onBlurField("location"),
      error: getFieldError("location"),
      autoCapitalize: "words" as const,
    },
  ];

  const professionalFields = [
    {
      key: "professionalTitle",
      label: "Titulo profesional",
      placeholder: "Software Developer",
      value: values.professionalTitle,
      onChangeText: (text: string) => setField("professionalTitle", text),
      onBlur: () => onBlurField("professionalTitle"),
      error: getFieldError("professionalTitle"),
      autoCapitalize: "words" as const,
    },
    {
      key: "experienceLevel",
      label: "Nivel de experiencia",
      placeholder: "Junior / Mid / Senior",
      value: values.experienceLevel,
      onChangeText: (text: string) => setField("experienceLevel", text),
      onBlur: () => onBlurField("experienceLevel"),
      error: getFieldError("experienceLevel"),
    },
    {
      key: "education",
      label: "Educacion",
      placeholder: "Bachelor in Computer Science",
      value: values.education,
      onChangeText: (text: string) => setField("education", text),
      onBlur: () => onBlurField("education"),
      error: getFieldError("education"),
      autoCapitalize: "sentences" as const,
    },
  ];

  const handlePrimaryAction = async () => {
    if (profileStep === 0) {
      handleContinue();
      return;
    }

    const canSubmitStep = handleContinue();
    if (!canSubmitStep || submitting) return;

    const result = await submitProfile();
    if (result === "session-missing") {
      Alert.alert(
        "Sesion requerida",
        "No se encontro la sesion. Por favor vuelve a registrarte.",
      );
      return;
    }

    if (result === "error") {
      Alert.alert(
        "Error",
        "No pudimos guardar tu informacion. Intenta de nuevo.",
      );
      return;
    }

    Alert.alert(
      "Perfil completado",
      "Tu informacion fue guardada correctamente.",
      [{ text: "Continuar", onPress: () => navigation.navigate("Main") }],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OnboardingHeader
          title="Completa tu perfil"
          subtitle={headerSubtitle}
          stepLabel={stepLabel}
        />

        <StepIndicator steps={STEP_LABELS} activeIndex={profileStep + 1} />

        <OnboardingSectionCard
          title={profileStep === 0 ? "Datos personales" : "Datos profesionales"}
          hint={
            profileStep === 0
              ? "Asegurate de que la informacion sea correcta."
              : "Esto ayuda a las empresas a entender tu experiencia."
          }
          footer={
            <View style={styles.footer}>
              {profileStep === 1 ? (
                <Button
                  title="Atras"
                  onPress={handleBack}
                  variant="outline"
                  style={styles.footerBtn}
                />
              ) : (
                <View style={styles.footerSpacer} />
              )}

              <Button
                title={profileStep === 0 ? "Continuar" : "Finalizar"}
                onPress={handlePrimaryAction}
                disabled={!canContinue || submitting}
                variant="success"
                style={styles.footerBtn}
              />
            </View>
          }
        >
          {profileStep === 0 ? (
            personalFields.map(({ key, ...field }) => (
              <TextField key={key} {...field} variant="light" />
            ))
          ) : (
            <>
              {professionalFields.map(({ key, ...field }) => (
                <TextField key={key} {...field} variant="light" />
              ))}

              <View style={styles.aboutBlock}>
                <Text style={styles.subSectionTitle}>SOBRE MI</Text>

                <TextField
                  label="Descripcion"
                  placeholder="Desarrollador enfocado en frontend y productos moviles."
                  value={values.aboutMe}
                  onChangeText={(text) => setField("aboutMe", text)}
                  onBlur={() => onBlurField("aboutMe")}
                  error={getFieldError("aboutMe")}
                  autoCapitalize="sentences"
                  multiline
                  variant="light"
                />

                <Text style={styles.helperText}>
                  Una descripcion corta (2-3 lineas).
                </Text>
              </View>
            </>
          )}
        </OnboardingSectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scroll: { flex: 1 },
  content: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  aboutBlock: {
    marginTop: spacing.sm,
  },
  subSectionTitle: {
    ...typography.captionSmall,
    color: colors.textColors.tertiary,
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  helperText: {
    ...typography.captionSmall,
    color: colors.textColors.tertiary,
    marginTop: -spacing.xs,
  },
  footer: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
  },
  footerBtn: { flex: 1 },
  footerSpacer: { flex: 1 },
});
