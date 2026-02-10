export type FeedComment = {
  id: string;
  author: string;
  avatarUrl?: string;
  text: string;
  timeLabel: string;
};

export type FeedPost = {
  id: string;
  author: string;
  authorAvatarUrl?: string;
  timeLabel: string;
  content: string;
  reactions: number;
  comments: number;
  latestComment?: FeedComment;
  isLikedByMe?: boolean;
  commentsList?: FeedComment[];
};

export type FeedUserApi = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  image_url: string | null;
};

export type FeedCommentApi = {
  id: string;
  content: string;
  created_at: string;
  author: FeedUserApi;
};

export type FeedReactionApi = {
  id: string;
  created_at: string;
  author: FeedUserApi;
};

export type FeedPostApi = {
  id: string;
  content: string;
  created_at: string;
  author: FeedUserApi;
  commentsCount: number;
  reactionsCount: number;
  comments: FeedCommentApi[];
  reactions: FeedReactionApi[];
  isOwner: boolean;
  isLikedByMe: boolean;
};

export type FeedGetAllResponse = {
  data: FeedPostApi[];
};
