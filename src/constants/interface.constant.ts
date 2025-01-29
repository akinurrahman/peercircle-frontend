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
