import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Bell, Sparkles } from "lucide-react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";
import { commonStyles } from "../../../theme/commonStyles";
import { homeStyles } from "../styles/home.styles";

type Props = {
  userName: string;
  onPressNotifications?: () => void;
};

export const HomeHero: React.FC<Props> = ({
  userName,
  onPressNotifications,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={homeStyles.heroWrap}>
      {/* Decorative bubbles */}
      <View pointerEvents="none" style={homeStyles.bubble1} />
      <View pointerEvents="none" style={homeStyles.bubble2} />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          right: 64,
          top: 80,
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: "rgba(255,255,255,0.20)",
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 48,
          top: 32,
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.15)",
        }}
      />

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Header row */}
        <View style={[commonStyles.rowBetween, { marginBottom: spacing.lg }]}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            {/* Label with icon */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginBottom: 4,
              }}
            >
              <Sparkles size={14} color="#10b981" />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Inicio
              </Text>
            </View>

            <Text style={[homeStyles.heroTitle, { marginTop: spacing.xs }]}>
              Bienvenido de vuelta,
            </Text>
            <Text style={homeStyles.heroTitle}>{userName}</Text>
          </View>
        </View>
        <Text style={[homeStyles.heroSubtitle, { maxWidth: 300 }]}>
          Aqui esta lo que ha estado pasando mientras estabas fuera.
        </Text>{" "}
      </Animated.View>
    </View>
  );
};
