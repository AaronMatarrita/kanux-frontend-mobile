import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChallengesScreen from "./ChallengeStack/ChallengesScreen";
import ChallengesDetailsScreen from "./ChallengeStack/ChallengesDetailsScreen"
import { ChallengesStackParamList } from "@/types/navigation";

const Stack = createNativeStackNavigator<ChallengesStackParamList>();

const ChallengesStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ChallengesList"
        component={ChallengesScreen}
      />
      <Stack.Screen
        name="ChallengeDetail"
        component={ChallengesDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default ChallengesStack;
