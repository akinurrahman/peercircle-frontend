import generateApis from "@/services/generate.api";

export const messageApis = {
  message: generateApis("/message"),
  conversations: generateApis("/conversations"),
};
