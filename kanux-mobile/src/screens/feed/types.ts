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
};
