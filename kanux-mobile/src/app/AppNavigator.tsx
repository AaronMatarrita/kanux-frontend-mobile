import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "@app/AuthNavigator";
import { MainNavigator } from "@app/MainNavigator";
import { useAuth } from "@context/AuthContext";

export function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
