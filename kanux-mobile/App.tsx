import { AppNavigator } from "@app/AppNavigator";
import { AuthProvider } from "@context/AuthContext";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <Toast />
    </AuthProvider>
  );
}
