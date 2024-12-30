export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface User {
  _id: string;
  fullName: string;
  profilePicture?: string;
}

export interface Reply {
  userId: User;
  comment: string;
  createdAt: string;
  _id: string;
}

export interface Comment {
  _id: string;
  postId: string;
  userId: User;
  comment: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}
