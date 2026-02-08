import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { X } from "lucide-react-native";
import { colors, spacing, typography, commonStyles } from "@/theme";

type Props = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const BaseModal: React.FC<Props> = ({
  visible,
  title,
  onClose,
  children,
  footer,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />

      <KeyboardAvoidingView
        style={styles.center}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={[styles.card, commonStyles.shadow]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
              <X size={18} color={colors.textColors.secondary} />
            </Pressable>
          </View>
          {/* Body */}
          <ScrollView
            style={styles.body}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
          {/* Footer */}
          {!!footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    maxHeight: "85%",
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...typography.body,
    fontWeight: "700",
    color: colors.textColors.primary,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flexGrow: 0,
  },
  bodyContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
});
