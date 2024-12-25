import generateApis from "@/services/generate.api";

export const feedApis = {
  posts: generateApis("/feed/posts"),
  products: generateApis("/feed/products"),
};
