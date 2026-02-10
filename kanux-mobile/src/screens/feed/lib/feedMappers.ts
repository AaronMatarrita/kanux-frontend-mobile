import {
  FeedComment,
  FeedCommentApi,
  FeedPost,
  FeedPostApi,
  FeedUserApi,
} from "../types";

function safeName(user: FeedUserApi): string {
  const full = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  return full || "Usuario";
}

function timeLabelFromISO(iso: string): string {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "Ahora";
    if (diffMin < 60) return `${diffMin}m`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH}h`;
    const diffD = Math.floor(diffH / 24);
    return `${diffD}d`;
  } catch {
    return "";
  }
}

export function mapCommentApiToUI(c: FeedCommentApi): FeedComment {
  return {
    id: c.id,
    author: safeName(c.author),
    avatarUrl: c.author.image_url ?? undefined,
    text: c.content,
    timeLabel: timeLabelFromISO(c.created_at),
  };
}

export function mapPostApiToUI(p: FeedPostApi): FeedPost {
  const commentsList = (p.comments ?? []).map(mapCommentApiToUI);
  const latest =
    commentsList.length > 0 ? commentsList[commentsList.length - 1] : undefined;

  return {
    id: p.id,
    author: safeName(p.author),
    authorAvatarUrl: p.author.image_url ?? undefined,
    timeLabel: timeLabelFromISO(p.created_at),
    content: p.content,
    reactions: p.reactionsCount ?? 0,
    comments: p.commentsCount ?? 0,
    latestComment: latest,
    isLikedByMe: p.isLikedByMe,
    commentsList,
  };
}
