import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "@app/AuthNavigator";
import { MainNavigator } from "@app/MainNavigator";

const IS_AUTHENTICATED = true;

export function AppNavigator() {
  return (
    <NavigationContainer>
      {IS_AUTHENTICATED ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
