import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./css/PlanButton.styles";

const PlanButton = ({
  isCurrent,
  onPress,
}: {
  isCurrent: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isCurrent && styles.disabledButton,
      ]}
      disabled={isCurrent}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          isCurrent && styles.disabledText,
        ]}
      >
        {isCurrent ? "Plan actual" : "Cambiar plan"}
      </Text>
    </TouchableOpacity>
  );
};

export default PlanButton;
