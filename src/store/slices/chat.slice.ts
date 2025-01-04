import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { messageApis } from "@/services/apis/message/message.api";
import { getErrorMessage } from "@/utils/getErrorMessage";

// Define the async thunk to fetch messages
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (messageId: string, { rejectWithValue }) => {
    try {
      if (!messageId) return;
      const response = await messageApis.message.getOne(messageId);
      return response; // This will be used as the payload in the fulfilled action
    } catch (error) {
      return rejectWithValue(getErrorMessage(error)); // Handle errors
    }
  }
);

interface Message {
  _id: string;
  createdAt: string;
  message: string;
  fullName: string;
  profilePicture?: string;
}

interface ChatState {
  messages: Message[];
  receiverInfo: {
    _id: string;
    fullName: string;
    username: string;
    profilePicture?: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  receiverInfo: {
    _id: "",
    fullName: "",
    username: "",
    profilePicture: "",
  },
  loading: false,
  error: null,
};

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
        state.messages = action.payload.messages;
        state.receiverInfo = action.payload.receiverInfo;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { appendMessage } = chatSlice.actions;

export default chatSlice.reducer;
