import { profileApis } from "@/services/apis/profile/profile.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface BasicProfile {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  profilePicture?: string;
}

export const fetchBasicProfile = createAsyncThunk<BasicProfile>(
  "profile/fetchBasicProfile",
  async () => {
    try {
      const data = await profileApis.basicProfile.getAll();
      return data;
    } catch (error) {
      toast.error(getErrorMessage(error));
      // Optionally throw here to let Redux mark the action as rejected
      throw error;
    }
  }
);

const initialState = {
  basicProfile: {
    _id: "",
    username: "",
    fullName: "",
    email: "",
    profilePicture: "",
  } as BasicProfile,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBasicProfile.fulfilled, (state, action) => {
      state.basicProfile = action.payload;
    });
  },
});

export default profileSlice.reducer;
