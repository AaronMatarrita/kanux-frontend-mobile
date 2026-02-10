import React from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, FlatList, ActivityIndicator } from "react-native";
import { PenSquare, Search } from "lucide-react-native";
import Header from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { colors, commonStyles } from "@/theme";
import { FeedPostCard } from "./components/FeedPostCard";
import { FeedSkeleton } from "./components/FeedSkeleton";
import styles from "./styles/feedScreen.styles";
import { useFeed } from "./hooks/useFeed";
import { FeedPost } from "./types";
import { FeedStackParamList } from "@/types/navigation";

type FeedScreenNavigationProp = NativeStackNavigationProp<
  FeedStackParamList,
  "FeedList"
>;

const FeedScreen: React.FC = () => {
  const {
    posts,
    loading,
    refreshing,
    loadingMore,
    error,
    refresh,
    retry,
    loadMore,
  } = useFeed();

  const navigation = useNavigation<FeedScreenNavigationProp>();
  const isInitialLoading = loading && posts.length === 0 && !refreshing;

  return (
    <View style={[commonStyles.container, styles.container]}>
      <Header
        title="Feed"
        leftIcon={<Search size={22} color={colors.textColors.inverted} />}
        rightIcon={<PenSquare size={22} color={colors.textColors.inverted} />}
        onLeftPress={() => undefined}
        onRightPress={() => undefined}
      />

      {isInitialLoading ? (
        <FeedSkeleton />
      ) : error && posts.length === 0 ? (
        <EmptyState
          title="No se pudo cargar el feed"
          description="Revisa tu conexión e intenta de nuevo."
          iconName="AlertCircle"
          buttonTitle="Reintentar"
          onButtonPress={retry}
        />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={refresh}
          onEndReachedThreshold={0.4}
          onEndReached={loadMore}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            ) : null
          }
          ListEmptyComponent={
            <EmptyState
              title="Aún no hay publicaciones"
              description="Cuando haya actividad, aquí verás las últimas novedades."
              iconName="Inbox"
            />
          }
          renderItem={({ item }) => (
            <FeedPostCard
              post={item}
              onPress={(post: FeedPost) =>
                navigation.navigate("FeedPostDetail", { post })
              }
              onCommentsPress={(post: FeedPost) =>
                navigation.navigate("FeedPostDetail", {
                  post,
                  focusComments: true,
                })
              }
            />
          )}
        />
      )}
    </View>
  );
};

export default FeedScreen;
