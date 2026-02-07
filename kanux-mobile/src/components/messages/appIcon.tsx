import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface AppIconProps {
  name: React.ComponentProps<typeof Ionicons>["name"];
  size?: number;
  color?: string;
}

const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 20,
  color = "#fff",
}) => {
  return <Ionicons name={name} size={size} color={color} />;
};

export default AppIcon;
