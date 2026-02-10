import { FeedPost } from "../types";

export const useFeedMock = () => {
  const posts: FeedPost[] = [
    {
      id: "post-1",
      author: "Mother Mimson",
      timeLabel: "hace 2 h",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      reactions: 24,
      comments: 3,
      latestComment: {
        id: "comment-1",
        author: "Ariana",
        text: "Excepteur sint occaecat...",
        timeLabel: "hace 1 h",
      },
    },
    {
      id: "post-2",
      author: "Connor Smith",
      timeLabel: "hace 3 h",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      reactions: 32,
      comments: 32,
      latestComment: {
        id: "comment-2",
        author: "Karen",
        text: "Excepteur sint occaecat...",
        timeLabel: "hace 2 h",
      },
    },
    {
      id: "post-3",
      author: "Dalia Torres",
      timeLabel: "hace 5 h",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      reactions: 18,
      comments: 0,
    },
  ];

  return { posts };
};
