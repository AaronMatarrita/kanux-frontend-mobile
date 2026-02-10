import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Trash,
  Trash2,
} from "lucide-react-native";
import Avatar from "@/components/messages/Avatar";
import Header from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { colors, commonStyles } from "@/theme";
import styles from "./styles/FeedPostDetail.styles";
import type { FeedPost, FeedComment } from "./types";
import type { FeedStackParamList } from "@/types/navigation";
import CommentInput from "./components/CommentInput";
import { feedService, type Comment } from "@/services/feed.service";
import { useAuth } from "@/context/AuthContext";
import { ConfirmActionSheet } from "@/components/ui/ConfirmActionSheet";

type Props = NativeStackScreenProps<FeedStackParamList, "FeedPostDetail">;

const FeedPostDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { post: initialPost, focusComments } = route.params;

  const { session } = useAuth();

  const [post, setPost] = useState<FeedPost>(initialPost);
  const [comments, setComments] = useState<FeedComment[]>(
    initialPost.commentsList ?? [],
  );
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [sendingComment, setSendingComment] = useState(false);

  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null,
  );

  const [deleteSheetOpen, setDeleteSheetOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<FeedComment | null>(
    null,
  );

  const myUserId = session?.user?.id;

  const scrollRef = useRef<ScrollView>(null);
  const navigatingBackRef = useRef(false);

  const handleDeleteComment = useCallback(async (commentId: string) => {
    try {
      setDeletingCommentId(commentId);
      await feedService.deleteComment(commentId);

      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setPost((prev) => ({
        ...prev,
        comments: Math.max(0, prev.comments - 1),
      }));
    } catch (err) {
      Alert.alert(
        "Error",
        "No se pudo eliminar el comentario. Intenta de nuevo.",
      );
    } finally {
      setDeletingCommentId(null);
    }
  }, []);

  const openDeleteCommentSheet = useCallback((comment: FeedComment) => {
    setCommentToDelete(comment);
    setDeleteSheetOpen(true);
  }, []);

  const closeDeleteCommentSheet = useCallback(() => {
    if (deletingCommentId) return;
    setDeleteSheetOpen(false);
    setCommentToDelete(null);
  }, [deletingCommentId]);

  const confirmDeleteComment = useCallback(async () => {
    if (!commentToDelete) return;

    await handleDeleteComment(commentToDelete.id);

    setDeleteSheetOpen(false);
    setCommentToDelete(null);
  }, [commentToDelete, handleDeleteComment]);

  const formatFeedTime = useCallback((iso?: string) => {
    if (!iso) return "";

    const now = new Date();
    const date = new Date(iso);
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return "Ahora";
    if (diffMinutes < 60) return `hace ${diffMinutes} min`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `hace ${diffHours} h`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `hace ${diffDays} d`;

    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
    });
  }, []);

  const getAuthorName = useCallback((author?: Comment["author"]) => {
    const name = [author?.first_name, author?.last_name]
      .filter(Boolean)
      .join(" ")
      .trim();

    if (name) return name;
    if (author?.title) return author.title;
    return "Usuario";
  }, []);

  const mapComment = useCallback(
    (comment: Comment): FeedComment =>
      ({
        id: comment.id,
        authorId: comment.author?.id,
        author: getAuthorName(comment.author),
        avatarUrl: comment.author?.image_url ?? undefined,
        text: comment.content,
        timeLabel: formatFeedTime(comment.created_at),
      }) as FeedComment,
    [formatFeedTime, getAuthorName],
  );

  const loadComments = useCallback(async () => {
    try {
      setCommentsError(null);
      setCommentsLoading(true);
      const response = await feedService.getCommentsByPost(initialPost.id);
      const mapped = response.map(mapComment);
      setComments(mapped);
      setPost((prev) => ({
        ...prev,
        comments: mapped.length,
        latestComment: mapped[mapped.length - 1],
      }));
    } catch (err) {
      console.error("Error loading comments:", err);
      setCommentsError("No se pudieron cargar los comentarios.");
    } finally {
      setCommentsLoading(false);
    }
  }, [initialPost.id, mapComment]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  useEffect(() => {
    if (focusComments) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 350);
    }
  }, [focusComments]);

  const heartColor = useMemo(
    () => (post.isLikedByMe ? colors.primary : colors.gray600),
    [post.isLikedByMe],
  );

  const toggleReaction = async () => {
    let snapshot: FeedPost | undefined;

    setPost((prev) => {
      snapshot = prev;
      const nextLiked = !prev.isLikedByMe;
      return {
        ...prev,
        isLikedByMe: nextLiked,
        reactions: Math.max(0, prev.reactions + (nextLiked ? 1 : -1)),
      };
    });

    try {
      await feedService.toggleReaction(post.id);
    } catch (err) {
      console.error("Error toggling reaction:", err);
      if (snapshot) setPost(snapshot);
    }
  };

  const addComment = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    try {
      setSendingComment(true);
      const response = await feedService.createComment(post.id, {
        content: trimmed,
      });

      const profile = session?.user?.profile;
      const fallbackAuthor = profile
        ? {
            id: session?.user?.id ?? "me",
            first_name: profile.first_name,
            last_name: profile.last_name,
            title: profile.title,
            image_url: profile.photo_url || undefined,
          }
        : undefined;

      const responseComment = response.data;
      const normalizedComment: Comment = responseComment.author
        ? responseComment
        : {
            ...responseComment,
            author: fallbackAuthor,
          };

      const newComment = mapComment(normalizedComment);

      setComments((prev) => [...prev, newComment]);
      setPost((prev) => ({
        ...prev,
        comments: prev.comments + 1,
        latestComment: newComment,
      }));

      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 200);
    } catch (err) {
      console.error("Error creating comment:", err);
    } finally {
      setSendingComment(false);
    }
  };

  const commentsLabel =
    post.comments === 1 ? "1 comentario" : `${post.comments} comentarios`;

  const updatedPostForList = useMemo(() => {
    const lastComment = comments[comments.length - 1];
    const commentsCount = Math.max(post.comments, comments.length);
    return {
      ...post,
      comments: commentsCount,
      latestComment: lastComment ?? post.latestComment,
    };
  }, [comments, post]);

  const navigateBackWithUpdate = useCallback(() => {
    if (navigatingBackRef.current) return;
    navigatingBackRef.current = true;
    navigation.navigate("FeedList", { updatedPost: updatedPostForList });
  }, [navigation, updatedPostForList]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (event) => {
      if (navigatingBackRef.current) return;
      event.preventDefault();
      navigateBackWithUpdate();
    });

    return unsubscribe;
  }, [navigateBackWithUpdate, navigation]);

  return (
    <View style={[commonStyles.container, styles.container]}>
      <Header
        title=""
        leftIcon={<ArrowLeft size={22} color={colors.textColors.inverted} />}
        onLeftPress={navigateBackWithUpdate}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentWrap}
          keyboardShouldPersistTaps="handled"
        >
          {/* Post Card */}
          <View style={styles.postCard}>
            <View style={styles.postHeaderRow}>
              <View style={styles.postHeaderLeft}>
                <Avatar
                  size={36}
                  source={
                    post.authorAvatarUrl
                      ? { uri: post.authorAvatarUrl }
                      : undefined
                  }
                />
                <View style={styles.postHeaderText}>
                  <Text style={styles.postAuthor} numberOfLines={1}>
                    {post.author}
                  </Text>
                  <Text style={styles.postTime}>{post.timeLabel}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                activeOpacity={0.75}
                style={[
                  styles.actionChip,
                  post.isLikedByMe ? styles.actionChipActive : null,
                ]}
                onPress={toggleReaction}
              >
                <Heart
                  size={18}
                  color={post.isLikedByMe ? "rgb(220, 38, 38)" : colors.gray600}
                  fill={post.isLikedByMe ? "rgb(220, 38, 38)" : "transparent"}
                  strokeWidth={1.9}
                />
                <Text style={styles.actionText}>{post.reactions}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.75}
                style={styles.actionChip}
                onPress={() => {
                  setTimeout(
                    () => scrollRef.current?.scrollToEnd({ animated: true }),
                    250,
                  );
                }}
              >
                <MessageCircle
                  size={18}
                  color={colors.gray600}
                  strokeWidth={1.9}
                />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Comments header */}
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsTitle}>Comentarios</Text>
            <Text style={styles.commentsSubtitle}>{commentsLabel}</Text>
          </View>

          {/* Empty comments */}
          {commentsLoading ? (
            <View style={styles.commentsStateWrap}>
              <ActivityIndicator size="small" color={colors.primary} />
            </View>
          ) : commentsError ? (
            <EmptyState
              title="No se pudieron cargar los comentarios"
              description="Revisa tu conexión e intenta de nuevo."
              iconName="AlertCircle"
              buttonTitle="Reintentar"
              onButtonPress={loadComments}
              style={styles.commentsStateWrap}
            />
          ) : comments.length === 0 ? (
            <View style={styles.emptyCommentsWrap}>
              <Text style={styles.emptyCommentsTitle}>
                Aún no hay comentarios
              </Text>
              <Text style={styles.emptyCommentsDesc}>
                Sé el primero en comentar.
              </Text>
            </View>
          ) : (
            comments.map((c) => {
              const isMine = !!myUserId && (c as any).authorId === myUserId;

              return (
                <View key={c.id} style={styles.commentItem}>
                  <Avatar
                    size={32}
                    source={c.avatarUrl ? { uri: c.avatarUrl } : undefined}
                  />
                  <View style={styles.commentBubble}>
                    <View style={styles.commentTopRow}>
                      <Text style={styles.commentAuthor} numberOfLines={1}>
                        {c.author}
                      </Text>
                      <Text style={styles.commentTime}>{c.timeLabel}</Text>

                      {isMine && (
                        <TouchableOpacity
                          onPress={() => openDeleteCommentSheet(c)}
                          disabled={deletingCommentId === c.id}
                          style={{
                            marginLeft: 8,
                            opacity: deletingCommentId === c.id ? 0.5 : 1,
                          }}
                        >
                          {deletingCommentId === c.id ? (
                            <ActivityIndicator size={16} color="#DC2626" />
                          ) : (
                            <Trash size={18} color="#DC2626" />
                          )}
                        </TouchableOpacity>
                      )}
                    </View>

                    <Text style={styles.commentText}>{c.text}</Text>
                  </View>
                </View>
              );
            })
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Comment input*/}
        <CommentInput
          onSend={addComment}
          placeholder="Escribe un comentario..."
          autoFocus={!!focusComments}
          sending={sendingComment}
        />
      </KeyboardAvoidingView>

      <ConfirmActionSheet
        visible={deleteSheetOpen}
        onClose={closeDeleteCommentSheet}
        onConfirm={confirmDeleteComment}
        loading={!!deletingCommentId}
        title="Eliminar comentario"
        description="¿Seguro que quieres eliminar este comentario? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        tone="destructive"
        icon={<Trash2 size={18} color="#D92D20" />}
      />
    </View>
  );
};

export default FeedPostDetailScreen;
