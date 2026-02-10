import React, { useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { PenSquare, Search } from "lucide-react-native";
import Header from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { colors, commonStyles } from "@/theme";
import { FeedPostCard } from "./components/FeedPostCard";
import { useFeedUiState } from "./hooks/useFeedUiState";
import { useFeedMock } from "./hooks/useFeedMock";
import styles from "./styles/feedScreen.styles";

const FeedScreen: React.FC = () => {
  const { state, setState } = useFeedUiState("ready");
  const { posts } = useFeedMock();
  const [refreshing, setRefreshing] = useState(false);

  const simulateReload = (nextState: "ready" | "empty" | "error" = "ready") => {
    setTimeout(() => {
      setState(nextState);
      setRefreshing(false);
    }, 600);
  };

  const handleRetry = () => {
    setState("loading");
    simulateReload("ready");
  };

  const handleRefresh = () => {
    setRefreshing(true);
    simulateReload("ready");
  };

  const renderState = () => {
    if (state === "loading") {
      return (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (state === "error") {
      return (
        <EmptyState
          title="No se pudo cargar el feed"
          description="Revisa tu conexión e intenta de nuevo."
          iconName="AlertCircle"
          buttonTitle="Reintentar"
          onButtonPress={handleRetry}
        />
      );
    }

    if (state === "empty") {
      return (
        <EmptyState
          title="Aún no hay publicaciones"
          description="Cuando haya actividad, aquí verás las últimas novedades."
          iconName="Inbox"
        />
      );
    }

    return null;
  };

  return (
    <View style={[commonStyles.container, styles.container]}>
      <Header
        title="Feed"
        leftIcon={<Search size={22} color={colors.textColors.inverted} />}
        rightIcon={<PenSquare size={22} color={colors.textColors.inverted} />}
        onLeftPress={() => undefined}
        onRightPress={() => undefined}
      />

      {state !== "ready" ? (
        renderState()
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          renderItem={({ item }) => (
            <FeedPostCard
              post={item}
              onPress={() => undefined}
              onCommentsPress={() => undefined}
            />
          )}
        />
      )}
    </View>
  );
};

export default FeedScreen;
