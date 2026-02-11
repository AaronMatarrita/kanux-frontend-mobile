import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChallengesScreen from "./ChallengeStack/ChallengesScreen";
import ChallengesDetailsScreen from "./ChallengeStack/ChallengesDetailsScreen"
import { ChallengesStackParamList } from "@/types/navigation";
import { SoftChallengeExecutionScreen } from "./ChallengeStack/ChallengeRun";
import { SoftChallengeResultsScreen } from "./ChallengeStack/ChallengeResult";

const Stack = createNativeStackNavigator<ChallengesStackParamList>();

const ChallengesStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ChallengesList" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ChallengesList"
        component={ChallengesScreen}
      />
      <Stack.Screen
        name="ChallengeDetail"
        component={ChallengesDetailsScreen}
      />
      <Stack.Screen 
        name="ChallengeRun"
        component={SoftChallengeExecutionScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ChallengeResult"
        component={SoftChallengeResultsScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default ChallengesStack;
