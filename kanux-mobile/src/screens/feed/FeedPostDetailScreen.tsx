// src/screens/feed/FeedPostDetailScreen.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react-native";
import Avatar from "@/components/messages/Avatar";
import Header from "@/components/ui/Header";
import { colors, commonStyles } from "@/theme";
import styles from "./styles/FeedPostDetail.styles";
import type { FeedPost, FeedComment } from "./types";
import type { FeedStackParamList } from "@/types/navigation";
import CommentInput from "./components/CommentInput";

type Props = NativeStackScreenProps<FeedStackParamList, "FeedPostDetail">;

const FeedPostDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { post: initialPost, focusComments } = route.params;

  const [post, setPost] = useState<FeedPost>(initialPost);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (focusComments) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 350);
    }
  }, [focusComments]);

  const heartColor = useMemo(
    () => (post.isLikedByMe ? colors.primary : colors.gray600),
    [post.isLikedByMe],
  );

  const toggleReaction = () => {
    setPost((prev) => {
      const nextLiked = !prev.isLikedByMe;
      return {
        ...prev,
        isLikedByMe: nextLiked,
        reactions: Math.max(0, prev.reactions + (nextLiked ? 1 : -1)),
      };
    });
  };

  const addComment = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newComment: FeedComment = {
      id: String(Date.now()),
      author: "Tú",
      text: trimmed,
      timeLabel: "Ahora",
      avatarUrl: undefined,
    };

    setPost((prev) => {
      const nextList = [...(prev.commentsList ?? []), newComment];
      return {
        ...prev,
        comments: prev.comments + 1,
        commentsList: nextList,
        latestComment: newComment,
      };
    });

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 200);
  };

  const commentsLabel =
    post.comments === 1 ? "1 comentario" : `${post.comments} comentarios`;

  return (
    <View style={[commonStyles.container, styles.container]}>
      <Header
        title=""
        leftIcon={<ArrowLeft size={22} color={colors.textColors.inverted} />}
        onLeftPress={() => navigation.goBack()}
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
          {(post.commentsList ?? []).length === 0 ? (
            <View style={styles.emptyCommentsWrap}>
              <Text style={styles.emptyCommentsTitle}>
                Aún no hay comentarios
              </Text>
              <Text style={styles.emptyCommentsDesc}>
                Sé el primero en comentar.
              </Text>
            </View>
          ) : (
            (post.commentsList ?? []).map((c) => (
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
                  </View>
                  <Text style={styles.commentText}>{c.text}</Text>
                </View>
              </View>
            ))
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Comment input*/}
        <CommentInput
          onSend={addComment}
          placeholder="Escribe un comentario..."
          autoFocus={!!focusComments}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default FeedPostDetailScreen;
