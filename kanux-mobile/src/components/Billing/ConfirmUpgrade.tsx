import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./css/ConfirmUpgrade.styles";
import { subscriptionsService } from "@services/subscriptions.service";

const ConfirmUpgradeModal = ({
  visible,
  planId,
  onClose,
  onSuccess,
}: any) => {
  const [loading, setLoading] = useState(false);

  const confirm = async () => {
    setLoading(true);
    await subscriptionsService.upgradeTalentPlan(planId, {
      status: "active",
    });
    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Confirmar cambio de plan</Text>
          <Text style={styles.description}>
            El nuevo plan se aplicará de inmediato.
          </Text>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={confirm}
          >
            <Text style={styles.confirmText}>
              {loading ? "Procesando..." : "Confirmar"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.cancelText} onPress={onClose}>
            Cancelar
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmUpgradeModal;
