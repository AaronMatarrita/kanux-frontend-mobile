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
}

const MessageItem: React.FC<MessageItemProps> = ({
  name,
  message,
  time,
  unreadCount = 0,
  avatar,
  isLast = false,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.container}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={styles.content}>
      <Avatar source={avatar} />

      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.message} numberOfLines={2}>
            {message}
          </Text>
          {unreadCount > 0 && <Badge count={unreadCount} />}
        </View>

        <Text style={styles.lastMessage}>Last message</Text>
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
    marginBottom: 4,
  },
  message: {
    ...typography.body,
    fontSize: 14,
    color: colors.textColors.secondary,
    flex: 1,
    marginRight: 8,
    lineHeight: 18,
  },
  lastMessage: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textColors.tertiary,
  },
});

export default MessageItem;
