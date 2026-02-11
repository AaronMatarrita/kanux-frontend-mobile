import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, FlatList, ActivityIndicator, Alert } from "react-native";
import { PenSquare, Search, Trash2 } from "lucide-react-native";

import Header from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { colors, commonStyles } from "@/theme";
import { FeedPostCard } from "./components/FeedPostCard";
import { FeedSkeleton } from "./components/FeedSkeleton";
import styles from "./styles/feedScreen.styles";
import { useFeed } from "./hooks/useFeed";
import type { FeedPost } from "./types";
import { feedService } from "@/services/feed.service";
import type { FeedStackParamList } from "@/types/navigation";
import { ConfirmActionSheet } from "@/components/ui/ConfirmActionSheet";

type FeedScreenNavigationProp = NativeStackNavigationProp<
  FeedStackParamList,
  "FeedList"
>;

const FeedScreen: React.FC = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const route = useRoute();

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

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [postToDelete, setPostToDelete] = useState<FeedPost | null>(null);

  const isInitialLoading = useMemo(
    () => loading && posts.length === 0 && !refreshing,
    [loading, posts.length, refreshing],
  );

  useEffect(() => {
    const params = (route.params || {}) as { updatedPost?: FeedPost };
    if (!params.updatedPost) return;

    updatePost(params.updatedPost);
    navigation.setParams({ updatedPost: undefined });
  }, [navigation, route.params, updatePost]);

  const handleEditPost = useCallback(
    (post: FeedPost) => {
      navigation.navigate("EditPost", { post });
    },
    [navigation],
  );

  const openDeletePostSheet = useCallback((post: FeedPost) => {
    setPostToDelete(post);
    setDeleteOpen(true);
  }, []);

  const closeDeletePostSheet = useCallback(() => {
    if (deleting) return;
    setDeleteOpen(false);
    setPostToDelete(null);
  }, [deleting]);

  const confirmDeletePost = useCallback(async () => {
    if (!postToDelete) return;

    try {
      setDeleting(true);
      await feedService.deletePost(postToDelete.id);
      removePost(postToDelete.id);
      setDeleteOpen(false);
      setPostToDelete(null);
    } catch (err) {
      Alert.alert("Error", "No se pudo eliminar el post. Intenta de nuevo.");
    } finally {
      setDeleting(false);
    }
  }, [postToDelete, removePost]);

  return (
    <>
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
                onPress={(post) =>
                  navigation.navigate("FeedPostDetail", { post })
                }
                onCommentsPress={(post) =>
                  navigation.navigate("FeedPostDetail", {
                    post,
                    focusComments: true,
                  })
                }
                onReactionPress={(post) => toggleReaction(post.id)}
                onEditPress={handleEditPost}
                onDeletePress={(post) => openDeletePostSheet(post)}
              />
            )}
          />
        )}
      </View>

      <ConfirmActionSheet
        visible={deleteOpen}
        onClose={closeDeletePostSheet}
        onConfirm={confirmDeletePost}
        loading={deleting}
        title="Eliminar post"
        description="¿Seguro que quieres eliminar este post? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        tone="destructive"
        icon={<Trash2 size={18} color="#D92D20" />}
      />
    </>
  );
};

export default FeedScreen;
