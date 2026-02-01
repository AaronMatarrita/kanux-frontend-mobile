import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChallengesScreen } from "@/screens/challenges/ChallengesScreen";
import { MessagesScreen } from "@/screens/messages/MessagesScreen";
import { ProfileScreen } from "@/screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Retos" component={ChallengesScreen} />
      <Tab.Screen name="Mensajes" component={MessagesScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
