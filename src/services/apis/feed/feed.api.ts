import generateApis from "@/services/generate.api";

export const feedApis = {
  posts: generateApis("/feed/posts"),
  products: generateApis("/feed/products"),
  toggleLike: generateApis("/like-unlike"),
  toggleBookmark: generateApis("/post/bookmark"),
  comment: generateApis("/comment"),
};
