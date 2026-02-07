// screens/ChatScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "@theme";
import { formatDateLabel } from "./utils/conversation";
import { messagesService } from "@services/messages.service";
import {
  ChatBubble,
  ChatInput,
  ChatHeader,
} from "../../components/messages/index";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Message } from "./types/message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MessagesStackParamList } from "@navigation";
type Props = NativeStackScreenProps<MessagesStackParamList, "Chat">;

const ChatScreen: React.FC<Props> = ({ route, navigation }) => {
  const { conversationId, conversationName, conversationAvatar } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const tabBarHeight = useBottomTabBarHeight();

  const loadMessages = async () => {
    try {
      setError(null);
      setLoading(true);
      console.log(conversationId);
      const response =
        await messagesService.getConversationMessages(conversationId);

      setMessages(response.messages);
    } catch (error) {
      console.error("Error loading messages:", error);
      setError("Failed to load messages. Please try again.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [conversationId]);

  const handleSendMessage = async (content: string) => {
    const tempId = Date.now().toString();
    try {
      setSending(true);

      const optimisticMessage: Message = {
        id: tempId,
        sender_type: "Talento",
        content,
        created_at: new Date().toISOString(),
        is_read: false,
      };

      setMessages((prev) => [...prev, optimisticMessage]);

      flatListRef.current?.scrollToEnd({ animated: true });

      const savedMessage = await messagesService.sendMessage({
        conversation_id: conversationId,
        content,
      });

      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempId ? savedMessage : msg)),
      );
    } catch (error) {
      console.error("Error sending message:", error);

      // ❌ Quita el mensaje optimista si falla
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));

      setError("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleCallPress = () => {
    console.log("Call pressed for:", conversationName);
  };

  const handleMenuPress = () => {
    console.log("Menu pressed for:", conversationName);
  };

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("es-CR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Costa_Rica",
    });
  };

  const getAvatarLetter = (name?: string) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  };

  const renderMessageItem = ({
    item,
    index,
  }: {
    item: Message;
    index: number;
  }) => {
    const isSender = item.sender_type === "Talento";

    const avatarLetter = isSender ? "T" : getAvatarLetter(conversationName);

    const getLocalDateKey = (date: string) =>
      new Intl.DateTimeFormat("es-CR", {
        timeZone: "America/Costa_Rica",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(date));

    const currentDate = getLocalDateKey(item.created_at);
    const previousDate =
      index > 0 ? getLocalDateKey(messages[index - 1].created_at) : null;

    const showDateSeparator = index === 0 || currentDate !== previousDate;

    return (
      <>
        {showDateSeparator && (
          <View style={styles.headerContainer}>
            <Text style={styles.dateHeader}>
              {formatDateLabel(new Date(item.created_at))}
            </Text>
          </View>
        )}

        <ChatBubble
          message={item.content}
          isSender={isSender}
          time={formatMessageTime(item.created_at)}
          avatarLetter={avatarLetter}
        />
      </>
    );
  };

  const renderLoading = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>Cargando mensajes...</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.emptyText}>
        No hay mensajes disponibles, inicia la conversacion!
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={tabBarHeight}
    >
      <ChatHeader
        name={conversationName}
        avatar={conversationAvatar}
        onBack={() => navigation.goBack()}
        onCallPress={handleCallPress}
        onMenuPress={handleMenuPress}
      />

      {loading ? (
        renderLoading()
      ) : error ? (
        renderError()
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          onLayout={() => flatListRef.current?.scrollToEnd()}
        />
      )}

      <ChatInput
        onSendMessage={handleSendMessage}
        placeholder="Escribe un mensaje"
      />

      {sending && (
        <View style={styles.sendingOverlay}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexGrow: 1,
  },
  headerContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  dateHeader: {
    backgroundColor: colors.gray300,
    color: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    overflow: "hidden",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.gray600,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray500,
    textAlign: "center",
  },
  sendingOverlay: {
    position: "absolute",
    bottom: 60,
    right: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ChatScreen;
