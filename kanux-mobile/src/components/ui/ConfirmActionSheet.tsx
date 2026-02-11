import React from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { AlertTriangle, X } from "lucide-react-native";

type Tone = "default" | "destructive";

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  tone?: Tone;
  icon?: React.ReactNode;
};

export function ConfirmActionSheet({
  visible,
  onClose,
  onConfirm,
  loading = false,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  tone = "default",
  icon,
}: Props) {
  const isDestructive = tone === "destructive";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={loading ? undefined : onClose}
    >
      <Pressable
        style={styles.backdrop}
        onPress={loading ? undefined : onClose}
      />

      <View style={styles.card}>
        <View style={styles.header}>
          <View
            style={[
              styles.iconWrap,
              isDestructive && styles.iconWrapDestructive,
            ]}
          >
            {icon ?? (
              <AlertTriangle
                size={18}
                color={isDestructive ? "#D92D20" : "#111"}
              />
            )}
          </View>

          <Text style={styles.title}>{title}</Text>
        </View>

        {!!description && <Text style={styles.desc}>{description}</Text>}

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.btn,
              styles.cancelBtn,
              pressed && styles.pressed,
              loading && styles.disabled,
            ]}
            onPress={onClose}
            disabled={loading}
          >
            <X size={16} color="#111" />
            <Text style={styles.cancelText}>{cancelText}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.btn,
              isDestructive ? styles.confirmBtnDestructive : styles.confirmBtn,
              pressed &&
                (isDestructive
                  ? styles.confirmPressedDestructive
                  : styles.confirmPressed),
              loading && styles.disabled,
            ]}
            onPress={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text
                style={[
                  styles.confirmText,
                  isDestructive && styles.confirmTextDestructive,
                ]}
              >
                {confirmText}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)" },

  card: {
    position: "absolute",
    left: 16,
    right: 16,
    top: "35%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
      },
      android: { elevation: 12 },
    }),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapDestructive: {
    backgroundColor: "rgba(217,45,32,0.10)",
  },

  title: { fontSize: 17, fontWeight: "800", color: "#111" },
  desc: {
    fontSize: 14,
    color: "rgba(0,0,0,0.65)",
    lineHeight: 20,
    marginBottom: 14,
  },

  actions: { flexDirection: "row", gap: 10 },

  btn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  cancelBtn: { backgroundColor: "rgba(0,0,0,0.06)" },
  cancelText: { fontSize: 15, fontWeight: "800", color: "#111" },

  confirmBtn: { backgroundColor: "#111" },
  confirmPressed: { backgroundColor: "#000" },

  confirmBtnDestructive: { backgroundColor: "#D92D20" },
  confirmPressedDestructive: { backgroundColor: "#B42318" },

  confirmText: { fontSize: 15, fontWeight: "800", color: "#fff" },
  confirmTextDestructive: { color: "#fff" },

  pressed: { opacity: 0.92 },
  disabled: { opacity: 0.7 },
});
