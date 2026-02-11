import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors, commonStyles } from "@theme";
import { messagesService } from "@services/messages.service";
import {
  Header,
  MessageItem,
  Separator,
  Footer,
} from "../../components/messages";
import {
  getConversationName,
  getConversationAvatar,
  formatTime,
  getUnreadCount,
  getMessagePreview,
} from "./utils/conversation";
import { Conversation } from "./types/message";
import AppIcon from "@/components/messages/appIcon";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MessagesStackParamList } from "@navigation";
import {
  useWebSocket,
  Message as SocketMessage,
} from "@/screens/messages/hooks/useWebSocket";
import { useAuth } from "@/context/AuthContext";

type NavigationProp = NativeStackNavigationProp<
  MessagesStackParamList,
  "MessagesList"
>;

const MessagesScreen: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp>();

  const { session, loading: authLoading, isAuthenticated } = useAuth();

  const token = session?.token;

  const getLatestMessageDate = (conversation: Conversation): Date => {
    if (conversation.last_message_at) {
      return new Date(conversation.last_message_at);
    }
    if (conversation.last_message?.created_at) {
      return new Date(conversation.last_message.created_at);
    }
    return new Date(0);
  };

  const sortConversations = useCallback((data: Conversation[]) => {
    return [...data].sort((a, b) => {
      const aUnread = getUnreadCount(a);
      const bUnread = getUnreadCount(b);

      if (aUnread !== bUnread) {
        return bUnread - aUnread;
      }

      const aDate = getLatestMessageDate(a);
      const bDate = getLatestMessageDate(b);

      return bDate.getTime() - aDate.getTime();
    });
  }, []);

  const loadConversations = async () => {
    try {
      setError(null);
      setLoading(true);

      const data = await messagesService.getUserConversations();
      setConversations(sortConversations(data));
    } catch (e) {
      console.error("Error loading conversations:", e);
      setError("No se pudieron cargar las conversaciones. Intenta nuevamente.");
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadConversations();
      return () => {};
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadConversations();
    setRefreshing(false);
  };

  const navigateToChat = (conversation: Conversation) => {
    navigation.navigate("Chat", {
      conversationId: conversation.id,
      conversationName: getConversationName(conversation),
      conversationAvatar: getConversationAvatar(conversation),
      companyId: conversation.company?.id,
    });
  };

  useWebSocket({
    token,
    enabled: Boolean(token),
    onMessageReceived: (msg: SocketMessage) => {
      setConversations((prev) => {
        const idx = prev.findIndex(
          (c) => c.id === (msg as any).conversation_id,
        );
        if (idx === -1) {
          loadConversations();
          return prev;
        }

        const current = prev[idx];

        const updated: Conversation = {
          ...current,
          last_message_at: msg.created_at,
          last_message: {
            ...(current as any).last_message,
            id: msg.id,
            sender_type: msg.sender_type,
            content: msg.content,
            created_at: msg.created_at,
            is_read: false,
          },
        } as any;

        const next = [...prev];
        next[idx] = updated;

        const resorted = sortConversations(next);
        return resorted;
      });
    },
    onMessageError: (err) => {
      console.error("Socket message error:", err);
    },
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: Conversation;
    index: number;
  }) => {
    const isLastMessageFromUser = item.last_message?.sender_type === "Talento";

    return (
      <View>
        <MessageItem
          name={getConversationName(item)}
          message={getMessagePreview(item)}
          time={formatTime(item.last_message_at)}
          unreadCount={getUnreadCount(item)}
          avatar={getConversationAvatar(item)}
          isLastMessageFromUser={isLastMessageFromUser}
          onPress={() => navigateToChat(item)}
        />
        {index < conversations.length - 1 && <Separator withMargin />}
      </View>
    );
  };

  const renderError = () => (
    <View style={styles.errorContainer}>
      <AppIcon name="alert-circle-outline" size={48} color={colors.gray400} />
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={loadConversations}
        activeOpacity={0.7}
      >
        <Text style={styles.retryButtonText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>Cargando conversaciones...</Text>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <AppIcon name="chatbubble-outline" size={64} color={colors.gray300} />
      <Text style={styles.emptyTitle}>No hay conversaciones</Text>
      <Text style={styles.emptyText}>
        Inicia una conversación con una compañía para comenzar a chatear
      </Text>
    </View>
  );

  const handleSearchPress = () => {
    console.log("Buscar compañías");
  };

  const handleAddPress = () => {
    console.log("Nueva conversación");
  };

  return (
    <View style={[commonStyles.container, styles.container]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {Platform.OS === "ios" && <View style={styles.iosSafeArea} />}

      <Header
        title="Chats"
        leftIcon={
          <AppIcon name="search" size={24} color={colors.textColors.inverted} />
        }
        rightIcon={
          <AppIcon
            name="add-circle-outline"
            size={24}
            color={colors.textColors.inverted}
          />
        }
        onLeftPress={handleSearchPress}
        onRightPress={handleAddPress}
      />

      {loading && !refreshing ? (
        renderLoading()
      ) : error ? (
        renderError()
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContainer,
            conversations.length === 0 && styles.emptyListContainer,
          ]}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={renderEmptyList}
        />
      )}

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  iosSafeArea: {
    backgroundColor: colors.surface,
    height: Platform.OS === "ios" ? 44 : 0,
  },
  listContainer: {
    paddingBottom: 8,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.gray600,
    fontFamily: "System",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 16,
    color: colors.gray700,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
    fontFamily: "System",
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "System",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray700,
    marginBottom: 8,
    fontFamily: "System",
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray500,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "System",
  },
});

export default MessagesScreen;
