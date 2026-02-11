import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@theme";
import AppIcon from "./appIcon";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = "Escribe un mensaje...",
}) => {
  const [message, setMessage] = useState("");

  const hasText = message.trim().length > 0;

  const handleSend = () => {
    if (!hasText) return;
    onSendMessage(message.trim());
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor={colors.gray500}
          multiline
        />

        <TouchableOpacity
          onPress={handleSend}
          activeOpacity={hasText ? 0.7 : 1}
          style={[
            styles.sendButton,
            hasText ? styles.sendEnabled : styles.sendDisabled,
          ]}
        >
          <AppIcon
            name="send"
            size={18}
            color={hasText ? colors.white : colors.gray500}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: colors.gray100,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: colors.gray800,
    maxHeight: 120,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },

  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  sendEnabled: {
    backgroundColor: colors.success,
  },

  sendDisabled: {
    backgroundColor: colors.gray300,
  },
});

export default ChatInput;
