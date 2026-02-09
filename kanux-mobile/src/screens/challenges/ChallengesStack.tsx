import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChallengesScreen from "./ChallengeStack/ChallengesScreen";


export type ChallengesStackParamList = {
  ChallengesList: undefined;
  ChallengeDetail: { challengeId: string };
  ChallengeRun: { challengeId: string };
  ChallengeResult: { challengeId: string; score?: number };
};

const Stack = createNativeStackNavigator<ChallengesStackParamList>();

const ChallengesStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ChallengesList"
        component={ChallengesScreen}
      />
    </Stack.Navigator>
  );
};

export default ChallengesStack;
