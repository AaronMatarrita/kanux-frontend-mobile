import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Trash2,
} from "lucide-react-native";
import { Card } from "@/components/ui/Card";
import Avatar from "@/components/messages/Avatar";
import { colors } from "@/theme";
import { FeedPost } from "../types";
import { useAuth } from "@/context/AuthContext";
import { PostOptionsSheet } from "./PostOptionsSheet";
import { ConfirmActionSheet } from "@/components/ui/ConfirmActionSheet";
import styles from "../styles/feedPostCard.styles";

type Props = {
  post: FeedPost;
  onPress?: (post: FeedPost) => void;
  onCommentsPress?: (post: FeedPost) => void;
  onReactionPress?: (post: FeedPost) => void;
  onEditPress?: (post: FeedPost) => void;
  onDeletePress?: (post: FeedPost) => void | Promise<void>;
};

export const FeedPostCard: React.FC<Props> = ({
  post,
  onPress,
  onCommentsPress,
  onReactionPress,
  onEditPress,
  onDeletePress,
}) => {
  const { session } = useAuth();
  const myUserId = session?.user?.id;

  const isMine = Boolean(post?.isOwner) || (post as any)?.authorId === myUserId;
  const heartColor = post.isLikedByMe ? colors.primary : colors.gray600;

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setOptionsOpen(false);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await onDeletePress?.(post);
      setDeleteOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Card
        variant="shadow"
        padding="lg"
        style={styles.card}
        onPress={onPress ? () => onPress(post) : undefined}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Avatar
              size={32}
              source={
                post.authorAvatarUrl ? { uri: post.authorAvatarUrl } : undefined
              }
            />
            <Text style={styles.author}>{post.author}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.time}>{post.timeLabel}</Text>

            {isMine && (
              <TouchableOpacity
                style={{ marginLeft: 8, padding: 4 }}
                onPress={() => setOptionsOpen(true)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <MoreVertical size={18} color={colors.gray500} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.content}>{post.content}</Text>

        <View style={styles.actionsRow}>
          <View style={styles.actionsLeft}>
            <TouchableOpacity
              activeOpacity={0.75}
              style={[
                styles.actionChip,
                styles.actionChipSpacer,
                post.isLikedByMe ? styles.actionChipActive : null,
              ]}
              onPress={
                onReactionPress ? () => onReactionPress(post) : undefined
              }
              disabled={!onReactionPress}
            >
              <Heart size={16} color={heartColor} strokeWidth={1.6} />
              <Text style={styles.actionText}>{post.reactions}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.actionChip}
              onPress={
                onCommentsPress ? () => onCommentsPress(post) : undefined
              }
              disabled={!onCommentsPress}
            >
              <MessageCircle
                size={16}
                color={colors.gray600}
                strokeWidth={1.6}
              />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {post.latestComment ? (
          <>
            <View style={styles.commentRow}>
              <Avatar
                size={28}
                source={
                  post.latestComment.avatarUrl
                    ? { uri: post.latestComment.avatarUrl }
                    : undefined
                }
              />
              <View style={styles.commentTextWrap}>
                <Text style={styles.latestLabel}>Último comentario:</Text>
                <Text style={styles.latestText} numberOfLines={1}>
                  {post.latestComment.text}
                </Text>
              </View>
            </View>

            {post.comments > 0 && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.viewAllWrap}
                onPress={
                  onCommentsPress ? () => onCommentsPress(post) : undefined
                }
                disabled={!onCommentsPress}
              >
                <Text style={styles.viewAllText}>
                  Ver {post.comments} comentarios
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : null}
      </Card>

      <PostOptionsSheet
        visible={optionsOpen}
        onClose={() => setOptionsOpen(false)}
        onEdit={() => {
          setOptionsOpen(false);
          onEditPress?.(post);
        }}
        onDelete={handleDelete}
        canEdit={isMine}
        canDelete={isMine}
      />

      <ConfirmActionSheet
        visible={deleteOpen}
        onClose={() => !deleting && setDeleteOpen(false)}
        onConfirm={confirmDelete}
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
