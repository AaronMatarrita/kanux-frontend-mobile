import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { colors, typography } from "@theme";
import Avatar from "./Avatar";
import Badge from "./Badge";

interface MessageItemProps {
  name: string;
  message: string;
  time: string;
  unreadCount?: number;
  avatar?: ImageSourcePropType;
  isLast?: boolean;
  onPress?: () => void;
  isLastMessageFromUser?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({
  name,
  message,
  time,
  unreadCount = 0,
  avatar,
  isLast = false,
  onPress,
  isLastMessageFromUser = false,
}) => (
  <TouchableOpacity
    style={styles.container}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={styles.content}>
      <View style={styles.avatarContainer}>
        <Avatar source={avatar} />
        {unreadCount > 0 && <View style={styles.unreadDot} />}
      </View>

      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text
            style={[
              styles.message,
              unreadCount > 0 && styles.unreadMessage,
              isLastMessageFromUser && styles.userMessage,
            ]}
            numberOfLines={2}
          >
            {message}
          </Text>
          {unreadCount > 0 && <Badge count={unreadCount} />}
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
  },
  content: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  unreadDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    ...typography.h3,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textColors.primary,
    flex: 1,
    marginRight: 8,
  },
  time: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textColors.tertiary,
  },
  messageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  message: {
    ...typography.body,
    fontSize: 14,
    color: colors.textColors.secondary,
    flex: 1,
    marginRight: 8,
    lineHeight: 18,
  },
  unreadMessage: {
    fontWeight: "600",
    color: colors.textColors.primary,
  },
  userMessage: {
    color: colors.textColors.tertiary,
    fontStyle: "italic",
  },
});

export default MessageItem;
