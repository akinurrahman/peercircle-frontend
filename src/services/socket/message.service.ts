import { store } from "@/store";
import { appendMessage } from "@/store/slices/message.slice";
import {
  incrementUnseenCount,
  resetUnseenCount,
} from "@/store/slices/conversation.slice";
import { Socket } from "socket.io-client";

let activeConversationId: string | null = null;

export const handleMessageSocketEvents = (socket: Socket) => {
  socket.on("newMessage", (message) => {
    const { conversationId } = message;

    // Append the message to the store
    store.dispatch(appendMessage(message));

    // Increment unseen count if not in active conversation
    if (activeConversationId !== conversationId) {
      store.dispatch(incrementUnseenCount({ conversationId }));
    }
  });
};

/**
 * Sets the active conversation and resets unseen count for it.
 * @param conversationId - The ID of the conversation.
 */
export const setActiveConversation = (conversationId: string | null) => {
  activeConversationId = conversationId;

  if (conversationId) {
    store.dispatch(resetUnseenCount({ conversationId }));
  }
};
