/**
 * Feed Service
 * Access layer for feed microservice (ms-feed)
 *
 * All requests are proxied through API Gateway at /feed
 */

import { httpClient } from "@/services/http";

// ============================================================================
// Request DTOs
// ============================================================================

export interface CreatePostRequest {
  content: string;
}

export interface UpdatePostRequest {
  content: string;
}

export interface CreateCommentRequest {
  post_id: string;
  content: string;
}

// ============================================================================
// Response DTOs
// ============================================================================

export interface PostAuthor {
  id: string;
  first_name: string | null;
  last_name: string | null;
  title?: string | null;
  image_url?: string | null;
}

export interface CommentAuthor {
  id: string;
  first_name: string | null;
  last_name: string | null;
  title?: string | null;
  image_url?: string | null;
}

export interface Comment {
  id: string;
  content: string;
  created_at?: string;
  updated_at?: string;
  author?: CommentAuthor;
  [key: string]: unknown;
}

export interface ReactionAuthor {
  id: string;
  first_name: string | null;
  last_name: string | null;
  title?: string | null;
  image_url?: string | null;
}

export interface Reaction {
  id: string;
  created_at?: string;
  author?: ReactionAuthor;
  [key: string]: unknown;
}

export interface Post {
  id: string;
  user_id?: string;
  content: string;
  created_at?: string;
  updated_at?: string;
  author?: PostAuthor;
  commentsCount?: number;
  reactionsCount?: number;
  comments?: Comment[];
  reactions?: Reaction[];
  isOwner?: boolean;
  isLikedByMe?: boolean;
  [key: string]: unknown;
}

export interface CreatePostResponse {
  message: string;
  data: Post;
}

export interface UpdatePostResponse {
  message: string;
  data: Post;
}

export interface DeletePostResponse {
  message: string;
  [key: string]: unknown;
}

export interface CreateCommentResponse {
  message: string;
  data: Comment;
}

export interface DeleteCommentResponse {
  message: string;
  [key: string]: unknown;
}

export interface ReactionToggleResponse {
  [key: string]: unknown;
}

export interface GetPostsResponse {
  data: Post[];
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
}

// ============================================================================
// Service
// ============================================================================

export const feedService = {
  // ========== Posts ==========

  /**
   * POST /feed/post
   * Create a new post (requires auth)
   */
  createPost: async (data: CreatePostRequest): Promise<CreatePostResponse> => {
    const res = await httpClient.post<CreatePostResponse>("/feed/post", data);
    return res.data;
  },

  /**
   * PUT /feed/:postId/update
   * Update a post (requires auth)
   */
  updatePost: async (
    postId: string,
    data: UpdatePostRequest,
  ): Promise<UpdatePostResponse> => {
    const res = await httpClient.put<UpdatePostResponse>(
      `/feed/${postId}/update`,
      data,
    );
    return res.data;
  },

  /**
   * DELETE /feed/post/:postId
   * Delete a post (requires auth)
   */
  deletePost: async (postId: string): Promise<DeletePostResponse> => {
    const res = await httpClient.delete<DeletePostResponse>(
      `/feed/post/${postId}`,
    );
    return res.data;
  },

  /**
   * GET /feed/my-post
   * Get current user's posts (requires auth)
   */
  getMyPosts: async (params?: GetPostsParams): Promise<GetPostsResponse> => {
    const res = await httpClient.get<GetPostsResponse>("/feed/my-post", {
      params,
    });
    return res.data;
  },

  /**
   * GET /feed/all-posts
   * Get all posts (requires auth)
   */
  getAllPosts: async (params?: GetPostsParams): Promise<GetPostsResponse> => {
    const res = await httpClient.get<GetPostsResponse>("/feed/all-posts", {
      params,
    });
    return res.data;
  },

  // ========== Comments ==========

  /**
   * POST /feed/:postId/comment
   * Create a comment on a post (requires auth)
   */
  createComment: async (
    postId: string,
    data: Omit<CreateCommentRequest, "post_id">,
  ): Promise<CreateCommentResponse> => {
    const res = await httpClient.post<CreateCommentResponse>(
      `/feed/${postId}/comment`,
      {
        ...data,
        post_id: postId,
      },
    );
    return res.data;
  },

  /**
   * DELETE /feed/comment/:commentId
   * Delete a comment (requires auth)
   */
  deleteComment: async (commentId: string): Promise<DeleteCommentResponse> => {
    const res = await httpClient.delete<DeleteCommentResponse>(
      `/feed/comment/${commentId}`,
    );
    return res.data;
  },

  /**
   * GET /feed/:postId/all-comment
   * Get all comments for a post (requires auth)
   */
  getCommentsByPost: async (postId: string): Promise<Comment[]> => {
    const res = await httpClient.get<Comment[] | { data?: Comment[] }>(
      `/feed/${postId}/all-comment`,
    );
    const payload = res.data;
    if (Array.isArray(payload)) return payload;
    if (payload?.data && Array.isArray(payload.data)) return payload.data;
    return [];
  },

  // ========== Reactions ==========

  /**
   * POST /feed/feed/:postId/reaction
   * Toggle a reaction on a post (requires auth)
   */
  toggleReaction: async (postId: string): Promise<ReactionToggleResponse> => {
    const res = await httpClient.post<ReactionToggleResponse>(
      `/feed/${postId}/reaction`,
      {},
    );
    return res.data;
  },
};
