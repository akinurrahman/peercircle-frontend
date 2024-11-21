import http from "@/services/http";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  full_name: string;
  username: string;
  profile_picture?: string;
  bio?: string;
  followers_count?: number;
  following_count?: number;
  location?: string;
  website_url?: string;
}

interface ProfileState {
  profile: Profile | null;
  error: string | null;
  loading: boolean;
}

const initialState: ProfileState = {
  profile: null,
  error: null,
  loading: false,
};

const baseUrl = "/api/user";

export const fetchBasicProfileInfo = createAsyncThunk<
  Profile,
  { id?: string } | void,
  { rejectValue: string }
>("profile/fetchBasicProfileInfo", async (payload, { rejectWithValue }) => {
  try {
    const response = await http.post(`${baseUrl}/profile`, payload || {});
    return response.data.data as Profile;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBasicProfileInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBasicProfileInfo.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.profile = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchBasicProfileInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile information";
      });
  },
});

export const { resetError } = profileSlice.actions;
export default profileSlice.reducer;
