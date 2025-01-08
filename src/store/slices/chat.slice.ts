import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { messageApis } from "@/services/apis/message/message.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "sonner";

interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  message: string;
  createdAt: string;
  fullName: string;
  profilePicture?: string;
}

interface ChatState {
  messages: Message[];
  conversationId: string | null;
  notifications: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  conversationId: null,
  notifications: [],
  loading: false,
  error: null,
};

// Async thunk to fetch messages for a conversation
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (conversationId: string, { rejectWithValue }) => {
    try {
      if (!conversationId) return [];
      const response = await messageApis.message.getAll(
        `?conversationId=${conversationId}`
      );
      return response; // This will be used as the payload in the fulfilled action
    } catch (error) {
      return rejectWithValue(getErrorMessage(error)); // Handle errors
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    appendMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    setCurrentConversationId(state, action: PayloadAction<string | null>) {
      state.conversationId = action.payload;
    },
    addIncomingMessage(state, action: PayloadAction<Message>) {
      const { conversationId } = action.payload;
      if (state.conversationId === conversationId) {
        state.messages.push(action.payload);
      } else {
        state.notifications.push(action.payload);
        toast.success(`${action.payload.fullName} has sent you a new message!`);
      }
    },
    clearNotifications(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (notification) => notification.conversationId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset any previous error
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  appendMessage,
  setCurrentConversationId,
  addIncomingMessage,
  clearNotifications,
} = chatSlice.actions;

export default chatSlice.reducer;
