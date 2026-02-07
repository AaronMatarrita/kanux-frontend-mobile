import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type {
  TabNavigatorParamList,
  RootNavigatorParamList,
} from "@navigation";

// Screens
import HomeScreen from "@screens/home/HomeScreen";
import FeedScreen from "@screens/feed/FeedScreen";
import ChallengesScreen from "@screens/challenges/ChallengesScreen";
import MessagesScreen from "@screens/messages/MessagesScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
import SkillsScreen from "@/screens/skills/SkillsScreen";

// Components
import BottomNavigationBar from "@components/navigations/BottomNavigationBar";

const Tab = createBottomTabNavigator<TabNavigatorParamList>();
const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomNavigationBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
};
