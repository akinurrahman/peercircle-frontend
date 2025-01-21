import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { messageApis } from "@/services/apis/message/message.api";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface Conversation {
  userId: string;
  fullName: string;
  username: string;
  profilePicture?: string;
  conversationId: string;
  unseenCount: number;
}

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  error: null,
};

// Fetch all conversations with unseen counts
export const fetchConversations = createAsyncThunk(
  "conversation/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await messageApis.conversation.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    incrementUnseenCount(
      state,
      action: PayloadAction<{ conversationId: string }>
    ) {
      const conversation = state.conversations.find(
        (c) => c.conversationId === action.payload.conversationId
      );
      if (conversation) {
        conversation.unseenCount += 1;
      }
    },
    resetUnseenCount(state, action: PayloadAction<{ conversationId: string }>) {
      const conversation = state.conversations.find(
        (c) => c.conversationId === action.payload.conversationId
      );
      if (conversation) {
        conversation.unseenCount = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { incrementUnseenCount, resetUnseenCount } =
  conversationSlice.actions;
export default conversationSlice.reducer;
