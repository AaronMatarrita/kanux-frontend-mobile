import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@theme";

interface ChatBubbleProps {
  message: string;
  isSender: boolean;
  time: string;
  avatarLetter: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isSender,
  time,
  avatarLetter,
}) => {
  return (
    <View
      style={[styles.row, isSender ? styles.rowSender : styles.rowReceiver]}
    >
      {!isSender && (
        <View style={[styles.avatar, styles.receiverAvatar]}>
          <Text style={styles.avatarText}>{avatarLetter}</Text>
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isSender ? styles.senderBubble : styles.receiverBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isSender ? styles.senderText : styles.receiverText,
          ]}
        >
          {message}
        </Text>

        <Text style={styles.timeText}>{time}</Text>
      </View>

      {isSender && (
        <View style={[styles.avatar, styles.senderAvatar]}>
          <Text style={styles.avatarText}>{avatarLetter}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 6,
    paddingHorizontal: 12,
  },

  rowSender: {
    justifyContent: "flex-end",
  },

  rowReceiver: {
    justifyContent: "flex-start",
  },

  bubble: {
    maxWidth: "70%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },

  senderBubble: {
    backgroundColor: colors.message,
    borderBottomRightRadius: 4,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.success,
  },

  receiverBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.gray100,
  },

  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },

  senderText: {
    color: colors.white,
  },

  receiverText: {
    color: colors.gray900,
  },

  timeText: {
    fontSize: 11,
    color: colors.gray500,
    marginTop: 4,
    alignSelf: "flex-end",
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  senderAvatar: {
    backgroundColor: colors.message,
  },

  receiverAvatar: {
    backgroundColor: colors.info,
  },

  avatarText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default ChatBubble;
