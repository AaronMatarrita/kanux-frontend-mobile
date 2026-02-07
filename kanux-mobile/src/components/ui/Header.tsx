import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { colors, typography } from "@theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
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
          {leftIcon ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onLeftPress}
              activeOpacity={0.7}
            >
              {leftIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.iconPlaceholder} />
          )}

          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          </View>

          {rightIcon ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onRightPress}
              activeOpacity={0.7}
            >
              {rightIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.iconPlaceholder} />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  statusBarBackground: {
    backgroundColor: colors.primary,
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  wrapper: {
    backgroundColor: colors.primary,
  },

  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 10, 
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  iconPlaceholder: {
    width: 40,
    height: 40,
  },

  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    ...typography.h1,
    fontSize: 18,
    fontWeight: "600",
    color: colors.textColors.inverted,
    letterSpacing: -0.4,
  },
});

export default Header;