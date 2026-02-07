import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { colors, typography } from "@theme";
import { ImageSourcePropType } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppIcon from "./appIcon";

interface ChatHeaderProps {
  name: string;
  avatar?: ImageSourcePropType;
  onBack: () => void;
  onCallPress?: () => void;
  onMenuPress?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  avatar,
  onBack,
  onCallPress,
  onMenuPress,
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

          <View style={styles.userInfoContainer}>
            <View style={styles.avatarContainer}>
              {avatar ? (
                <Image
                  source={avatar}
                  style={styles.avatar}
                  onError={(e) =>
                    console.log("Error loading avatar:", e.nativeEvent.error)
                  }
                />
              ) : (
                <View style={styles.defaultAvatar}>
                  <Text style={styles.avatarText}>
                    {name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.name}>
                {name}
              </Text>
            </View>
          </View>

          <View style={styles.rightActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onMenuPress}
              activeOpacity={0.7}
            >
              <AppIcon
                name="ellipsis-vertical"
                size={24}
                color={colors.textColors.inverted}
              />
            </TouchableOpacity>
          </View>
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

  userInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
  },

  avatarContainer: {
    marginRight: 12,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  defaultAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  avatarText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },

  textContainer: {
    flex: 1,
  },

  name: {
    ...typography.h1,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textColors.inverted,
    letterSpacing: -0.4,
    marginBottom: 2,
  },

  status: {
    ...typography.body,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    opacity: 0.9,
  },

  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default ChatHeader;
