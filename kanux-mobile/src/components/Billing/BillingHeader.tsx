import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { colors } from "@theme";
import { styles } from "./css/BillingHeader.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppIcon from "@/components/messages/appIcon";

interface BillingHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
}

const BillingHeader: React.FC<BillingHeaderProps> = ({
  title,
  subtitle,
  onBack,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={styles.statusBarBackground}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.primary}
          translucent={false}
        />
      </View>

      <View style={styles.wrapper}>
        <View
          style={[
            styles.container,
            { paddingTop: Platform.OS === "ios" ? insets.top : 0 },
          ]}
        >
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <AppIcon
              name="chevron-back"
              size={24}
              color={colors.textColors.inverted}
            />
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default BillingHeader;
