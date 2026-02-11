import React from "react";
import { View, Text } from "react-native";
import { styles } from "./css/PlanBadge.styles";

const PlanBadge = () => {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>Plan actual</Text>
    </View>
  );
};

export default PlanBadge;
