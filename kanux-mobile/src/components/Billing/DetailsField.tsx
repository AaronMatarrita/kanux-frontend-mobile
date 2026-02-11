import React from "react";
import { View, Text } from "react-native";
import { styles } from "./css/DetailsField.styles";

const DetailField = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default DetailField;
