import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { messageApis } from "@/services/apis/message/message.api";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  message: string;
  createdAt: string;
  fullName: string;
  profilePicture?: string;
  seen: boolean;
}

interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};

// Fetch messages for a specific conversation
export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (conversationId: string, { rejectWithValue }) => {
    try {
      const response = await messageApis.message.getAll(
        `?conversationId=${conversationId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    appendMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
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

export const { appendMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
