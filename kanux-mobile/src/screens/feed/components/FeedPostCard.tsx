import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Heart, MessageCircle } from "lucide-react-native";
import { Card } from "@/components/ui/Card";
import Avatar from "@/components/messages/Avatar";
import { colors } from "@/theme";
import { FeedPost } from "../types";
import styles from "../styles/feedPostCard.styles";

type Props = {
  post: FeedPost;
  onPress?: (post: FeedPost) => void;
  onCommentsPress?: (post: FeedPost) => void;
};

export const FeedPostCard: React.FC<Props> = ({
  post,
  onPress,
  onCommentsPress,
}) => {
  return (
    <Card
      variant="shadow"
      padding="lg"
      style={styles.card}
      onPress={onPress ? () => onPress(post) : undefined}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Avatar size={32} />
          <Text style={styles.author}>{post.author}</Text>
        </View>
        <Text style={styles.time}>{post.timeLabel}</Text>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      <View style={styles.actionsRow}>
        <View style={styles.actionsLeft}>
          <View style={[styles.actionChip, styles.actionChipSpacer]}>
            <Heart size={16} color={colors.gray600} strokeWidth={1.6} />
            <Text style={styles.actionText}>{post.reactions}</Text>
          </View>

          <View style={styles.actionChip}>
            <MessageCircle size={16} color={colors.gray600} strokeWidth={1.6} />
            <Text style={styles.actionText}>{post.comments}</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {post.latestComment ? (
        <>
          <View style={styles.commentRow}>
            <Avatar size={28} />
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
            >
              <Text style={styles.viewAllText}>
                Ver {post.comments} comentarios
              </Text>
            </TouchableOpacity>
          )}
        </>
      ) : null}
    </Card>
  );
};
