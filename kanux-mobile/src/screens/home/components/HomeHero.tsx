import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";
import { commonStyles } from "../../../theme/commonStyles";
import { Bell } from "lucide-react-native";

type Props = {
  userName: string;
  onPressNotifications?: () => void;
};

export const HomeHero: React.FC<Props> = ({
  userName,
  onPressNotifications,
}) => {
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        paddingTop: spacing.xxl,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xxxl,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: "hidden",
      }}
    >
      {/* top row */}
      <View style={[commonStyles.rowBetween, { marginBottom: spacing.lg }]}>
        <View style={{ flex: 1, paddingRight: spacing.md }}>
          <Text
            style={[typography.caption, { color: "rgba(255,255,255,0.85)" }]}
          >
            Inicio
          </Text>
          <Text
            style={[
              typography.h2,
              { color: colors.white, marginTop: spacing.xs },
            ]}
          >
            Bienvenido de vuelta,
          </Text>
          <Text style={[typography.h2, { color: colors.white }]}>
            {userName}
          </Text>
        </View>
      </View>

      <Text
        style={[
          typography.bodySmall,
          { color: "rgba(255,255,255,0.85)", maxWidth: 320 },
        ]}
      >
        Aquí está lo que ha estado pasando mientras estabas fuera.
      </Text>
    </View>
  );
};
