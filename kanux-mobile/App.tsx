import { AppNavigator } from "@app/AppNavigator";
import { AuthProvider } from "@context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
