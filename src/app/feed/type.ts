export interface User {
  _id: string;
  fullName: string;
  username: string;
  profilePicture: string;
}

export interface Post {
  _id: string;
  caption: string;
  mediaUrls: string[];
  author: User;
  createdAt: string;
  isLiked: boolean;
  isBookmarked: boolean;
  isFollowing: boolean;
  likeCount: number;
  commentCount: number;
  type: "post";
  isMine: boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  mediaUrls: string[];
  createdAt: string;
  isLiked: boolean;
  isFollowing: boolean;
  likeCount: number;
  commentCount: number;
  type: "product";
  isMine: boolean;
  author: User;
}

export type FeedItem = Post | Product;
