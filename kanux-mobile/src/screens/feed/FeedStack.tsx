import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FeedStackParamList } from "@/types/navigation";
import FeedScreen from "./FeedScreen";
import FeedPostDetailScreen from "./FeedPostDetailScreen";
import CreatePostScreen from "./CreatePostScreen";
import EditPostScreen from "./EditPostScreen";

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
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="EditPost" component={EditPostScreen} />
    </Stack.Navigator>
  );
};
