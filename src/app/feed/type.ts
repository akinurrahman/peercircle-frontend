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
  type: "Post";
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
  type: "Product";
  isMine: boolean;
  author: User;
}

export type FeedItem = Post | Product;

export interface Comment {
  _id: string;
  text: string;
  author: {
    _id: string;
    email: string;
    fullName: string;
    profilePicture?: string;
  };
  refType: "Post" | "Product";
  refId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
