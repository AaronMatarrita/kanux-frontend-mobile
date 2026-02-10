export type FeedComment = {
  id: string;
  author: string;
  text: string;
  timeLabel: string;
};

export type FeedPost = {
  id: string;
  author: string;
  timeLabel: string;
  content: string;
  reactions: number;
  comments: number;
  latestComment?: FeedComment;
};
