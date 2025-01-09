import generateApis from "@/services/generate.api";

export const messageApis = {
  message: generateApis("/message"),
  conversation: generateApis("/conversation"),
};
