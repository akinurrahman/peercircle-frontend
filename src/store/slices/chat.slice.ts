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
}

interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
};

// Define the async thunk to fetch messages
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (receiverId: string, { rejectWithValue }) => {
    try {
      if (!receiverId) return;
      const response = await messageApis.message.getAll(
        `?receiverId=${receiverId}`
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
    appendMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
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

export const { appendMessage } = chatSlice.actions;

export default chatSlice.reducer;
