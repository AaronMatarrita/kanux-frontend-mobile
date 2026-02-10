import { useCallback, useEffect, useState } from "react";
import { feedService, type Comment, type Post } from "@/services/feed.service";
import type { FeedPost, FeedComment } from "../types";

const PAGE_SIZE = 10;

const formatFeedTime = (iso?: string) => {
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
};

const getAuthorName = (author?: Post["author"]) => {
  const name = [author?.first_name, author?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (name) return name;
  if (author?.title) return author.title;
  return "Usuario";
};

const mapComment = (comment: Comment): FeedComment => {
  return {
    id: comment.id,
    author: getAuthorName(comment.author),
    avatarUrl: comment.author?.image_url ?? undefined,
    text: comment.content,
    timeLabel: formatFeedTime(comment.created_at),
  };
};

const getLatestComment = (comments?: Comment[]) => {
  if (!comments || comments.length === 0) return undefined;

  const sorted = [...comments].sort((a, b) => {
    const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
    const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
    return bTime - aTime;
  });

  return mapComment(sorted[0]);
};

const mapPost = (post: Post): FeedPost => {
  const commentsCount = post.commentsCount ?? post.comments?.length ?? 0;
  const reactionsCount = post.reactionsCount ?? post.reactions?.length ?? 0;

  const commentsList = (post.comments ?? []).map(mapComment);

  return {
    id: post.id,
    author: getAuthorName(post.author),
    authorAvatarUrl: post.author?.image_url ?? undefined,
    timeLabel: formatFeedTime(post.created_at),
    content: post.content,
    reactions: reactionsCount,
    comments: commentsCount,
    latestComment: getLatestComment(post.comments),
    isLikedByMe: post.isLikedByMe ?? false,
    commentsList,
  };
};

const mergePosts = (current: FeedPost[], incoming: FeedPost[]) => {
  const existingIds = new Set(current.map((post) => post.id));
  const merged = [...current];
  let newItems = 0;

  incoming.forEach((post) => {
    if (!existingIds.has(post.id)) {
      merged.push(post);
      newItems += 1;
    }
  });

  return { merged, newItems };
};

export const useFeed = () => {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = useCallback(
    async (options: {
      page: number;
      mode: "replace" | "append" | "refresh";
    }) => {
      const { page: nextPage, mode } = options;

      try {
        setError(null);
        if (mode === "replace") setLoading(true);
        if (mode === "refresh") setRefreshing(true);
        if (mode === "append") setLoadingMore(true);

        const response = await feedService.getAllPosts({
          page: nextPage,
          limit: PAGE_SIZE,
        });

        const mapped = response.data.map(mapPost);

        if (mode === "replace" || mode === "refresh") {
          setPosts(mapped);
          setHasMore(mapped.length >= PAGE_SIZE);
        } else {
          setPosts((prev) => {
            const result = mergePosts(prev, mapped);
            setHasMore(mapped.length >= PAGE_SIZE && result.newItems > 0);
            return result.merged;
          });
        }

        setPage(nextPage);
      } catch (err) {
        console.error("Error loading feed:", err);
        setError("No se pudo cargar el feed. Intenta nuevamente.");
        if (mode !== "append") setPosts([]);
        setHasMore(false);
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadPosts({ page: 1, mode: "replace" });
  }, [loadPosts]);

  const refresh = useCallback(() => {
    loadPosts({ page: 1, mode: "refresh" });
  }, [loadPosts]);

  const retry = useCallback(() => {
    loadPosts({ page: 1, mode: "replace" });
  }, [loadPosts]);

  const loadMore = useCallback(() => {
    if (loading || refreshing || loadingMore || !hasMore) return;
    loadPosts({ page: page + 1, mode: "append" });
  }, [hasMore, loadPosts, loading, loadingMore, page, refreshing]);

  return {
    posts,
    loading,
    refreshing,
    loadingMore,
    error,
    hasMore,
    refresh,
    retry,
    loadMore,
  };
};
