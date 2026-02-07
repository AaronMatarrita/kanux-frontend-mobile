import React, { useEffect, useState } from "react";
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
} from "./utils/conversation";
import { Conversation } from "./types/message";
import AppIcon from "@/components/messages/appIcon";

const MessagesScreen: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadConversations = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await messagesService.getUserConversations();
      setConversations(data);
    } catch (error) {
      console.error("Error loading conversations:", error);
      setError("No se pudieron cargar las conversaciones. Intenta nuevamente.");
      setConversations([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadConversations();
    setRefreshing(false);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: Conversation;
    index: number;
  }) => (
    <View>
      <MessageItem
        name={getConversationName(item)}
        message={item.last_message?.content ?? "Inicia conversación"}
        time={formatTime(item.last_message_at)}
        unreadCount={getUnreadCount(item)}
        avatar={getConversationAvatar(item)}
        onPress={() => console.log("Conversation:", item)}
      />
      {index < conversations.length - 1 && <Separator withMargin />}
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <AppIcon
        name="alert-circle-outline"
        size={48}
        color={colors.gray400}
      />
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
      <AppIcon
        name="chatbubble-outline"
        size={64}
        color={colors.gray300}
       
      />
      <Text style={styles.emptyTitle}>No hay conversaciones</Text>
      <Text style={styles.emptyText}>
        Inicia una nueva conversación para comenzar a chatear
      </Text>
    </View>
  );

  return (
    <View style={[commonStyles.container, styles.container]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {Platform.OS === "ios" && <View style={styles.iosSafeArea} />}

      <Header
        title="Chats"
        leftIcon={
          <AppIcon
            name="search"
            size={24}
            color={colors.textColors.inverted}
          />
        }
        rightIcon={
          <AppIcon
            name="add-circle-outline"
            size={24}
            color={colors.textColors.inverted}
          />
        }
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
  errorIcon: {
    marginBottom: 16,
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
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
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