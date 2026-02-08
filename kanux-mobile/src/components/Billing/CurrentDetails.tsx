import React from "react";
import { View, Text } from "react-native";
import { styles } from "./css/CurrentDetails.styles";
import DetailField from "./DetailsField";

interface CurrentPlanDetailsProps {
  planName: string;
  billingCycle: string;
  nextBillingDate: string;
  paymentMethod: string;
}

const CurrentPlanDetails: React.FC<CurrentPlanDetailsProps> = ({
  planName,
  billingCycle,
  nextBillingDate,
  paymentMethod,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Detalles de la suscripción</Text>

      <DetailField label="Plan" value={planName} />
      <DetailField label="Ciclo de facturación" value={billingCycle} />
      <DetailField label="Próxima fecha de cobro" value={nextBillingDate} />
      <DetailField label="Método de pago" value={paymentMethod} />
    </View>
  );
};
export default CurrentPlanDetails;
