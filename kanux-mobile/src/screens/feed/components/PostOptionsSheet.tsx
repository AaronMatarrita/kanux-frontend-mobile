import React from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { Pencil, Trash2, X } from "lucide-react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
};

export function PostOptionsSheet({
  visible,
  onClose,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.sheet}>
        <View style={styles.handleWrap}>
          <View style={styles.handle} />
        </View>

        {canEdit && (
          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            onPress={() => {
              onClose();
              onEdit();
            }}
          >
            <View style={styles.row}>
              <Pencil size={18} color="#111" />
              <Text style={styles.itemText}>Editar</Text>
            </View>
          </Pressable>
        )}

        {canDelete && (
          <>
            <View style={styles.divider} />
            <Pressable
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}
              onPress={() => {
                onClose();
                onDelete();
              }}
            >
              <View style={styles.row}>
                <Trash2 size={18} color="#D92D20" />
                <Text style={[styles.itemText, styles.dangerText]}>
                  Eliminar
                </Text>
              </View>
            </Pressable>
          </>
        )}

        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [
              styles.cancelBtn,
              pressed && styles.cancelPressed,
            ]}
            onPress={onClose}
          >
            <X size={18} color="#111" />
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: "white",
    borderRadius: 18,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.14,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 10 },
    }),
  },
  handleWrap: {
    paddingTop: 10,
    paddingBottom: 6,
    alignItems: "center",
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  pressed: {
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#111",
    fontWeight: "600",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  dangerText: {
    color: "#D92D20",
  },
  footer: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.02)",
  },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  cancelPressed: {
    backgroundColor: "rgba(0,0,0,0.10)",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
});
