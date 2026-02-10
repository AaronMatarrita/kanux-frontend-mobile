import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "../../components/Billing/css/TalentBillingScreen.styles";
import PlanCard from "../../components/Billing/PlanCard";
import CurrentPlanDetails from "../../components/Billing/CurrentDetails";
import ConfirmUpgradeModal from "../../components/Billing/ConfirmUpgrade";
import BillingHeader from "../../components/Billing/BillingHeader";
import { BillingSkeleton } from "../../components/Billing/BillingSkeleton";
import {
  subscriptionsService,
  TalentPlan,
  TalentSubscriptionResponse,
} from "@services/subscriptions.service";
import { useNavigation } from "@react-navigation/native";

const TalentBillingScreen = () => {
  const navigation = useNavigation();
  const [plans, setPlans] = useState<TalentPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TalentSubscriptionResponse>();
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);


  const isFreePlan =
  !currentPlan || Number(currentPlan?.talent_plans?.price_monthly) === 0;

const formattedDate = currentPlan?.end_date
  ? new Date(currentPlan.end_date).toLocaleDateString("es-CR", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "America/Costa_Rica",
    })
  : "Sin vencimiento";

const planInfo = {
  name: currentPlan?.talent_plans?.name ?? "Free",
  cycle: isFreePlan ? "Único / Gratis" : "Mensual",
  date: isFreePlan ? "Sin vencimiento" : formattedDate,
  method: isFreePlan
    ? "Sin método de pago"
    : "Tarjeta terminada en •••• 4242",
};



  const loadData = async () => {
    setLoading(true);
    const plansResponse = await subscriptionsService.getAllTalentPlans();
    const current = await subscriptionsService.getTalentSubscription();
    setPlans(plansResponse);
    setCurrentPlan(current);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <BillingHeader
          title="Planes y suscripción"
          onBack={() => navigation.goBack()}
        />
        <BillingSkeleton />
      </>
    );
  }

  return (
    <>
      <BillingHeader
        title="Planes y suscripción"
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <CurrentPlanDetails
          planName={planInfo.name}
          billingCycle={planInfo.cycle}
          nextBillingDate={planInfo.date}
          paymentMethod={planInfo.method}
        />

        <Text style={styles.sectionTitle}>Planes disponibles</Text>
        <Text style={styles.subtitle}>
          Elige el plan que mejor se adapte a tus objetivos profesionales.
        </Text>

        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrentPlan={plan.id === currentPlan?.plan_id}
            onUpgrade={(id) => {
              setSelectedPlanId(id);
              setConfirmVisible(true);
            }}
          />
        ))}
      </ScrollView>

      <ConfirmUpgradeModal
        visible={confirmVisible}
        planId={selectedPlanId}
        onClose={() => setConfirmVisible(false)}
        onSuccess={loadData}
      />
    </>
  );
};

export default TalentBillingScreen;
