import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FeedStackParamList } from "@/types/navigation";
import FeedScreen from "./FeedScreen";
import FeedPostDetailScreen from "./FeedPostDetailScreen";

const Stack = createNativeStackNavigator<FeedStackParamList>();

export const FeedStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FeedList" component={FeedScreen} />
      <Stack.Screen name="FeedPostDetail" component={FeedPostDetailScreen} />
    </Stack.Navigator>
  );
};
