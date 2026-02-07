import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessagesScreen from "@screens/messages/MessagesScreen";
import ChatScreen from "@screens/messages/ChatScreen";
import { MessagesStackParamList } from "@navigation";

const Stack = createNativeStackNavigator<MessagesStackParamList>();

export const MessagesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MessagesList" component={MessagesScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
