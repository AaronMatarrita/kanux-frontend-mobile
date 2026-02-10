import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, FlatList, ActivityIndicator, Alert } from "react-native";
import { PenSquare, Search } from "lucide-react-native";
import Header from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { colors, commonStyles } from "@/theme";
import { FeedPostCard } from "./components/FeedPostCard";
import { FeedSkeleton } from "./components/FeedSkeleton";
import styles from "./styles/feedScreen.styles";
import { useFeed } from "./hooks/useFeed";
import { FeedPost } from "./types";
import { feedService } from "@/services/feed.service";
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
    toggleReaction,
    updatePost,
    removePost,
  } = useFeed();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const handleDeletePost = async (post: FeedPost) => {
    Alert.alert(
      "Eliminar post",
      "¿Seguro que quieres eliminar este post?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setDeletingId(post.id);
            try {
              await feedService.deletePost(post.id);
              removePost(post.id);
            } catch (err) {
              Alert.alert("Error", "No se pudo eliminar el post.");
            } finally {
              setDeletingId(null);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleEditPost = (post: FeedPost) => {
    navigation.navigate("EditPost", { post });
  };

  const navigation = useNavigation<FeedScreenNavigationProp>();
  const route = useRoute();
  const isInitialLoading = loading && posts.length === 0 && !refreshing;

  useEffect(() => {
    const params = (route.params || {}) as { updatedPost?: FeedPost };
    if (!params.updatedPost) return;
    updatePost(params.updatedPost);
    navigation.setParams({ updatedPost: undefined });
  }, [navigation, route.params, updatePost]);

  return (
    <View style={[commonStyles.container, styles.container]}>
      <Header
        title="Feed"
        leftIcon={<Search size={22} color={colors.textColors.inverted} />}
        rightIcon={<PenSquare size={22} color={colors.textColors.inverted} />}
        onLeftPress={() => undefined}
        onRightPress={() => navigation.navigate("CreatePost")}
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
              onReactionPress={(post: FeedPost) => toggleReaction(post.id)}
              onDeletePress={handleDeletePost}
              onEditPress={handleEditPost}
            />
          )}
        />
      )}
    </View>
  );
};

export default FeedScreen;
