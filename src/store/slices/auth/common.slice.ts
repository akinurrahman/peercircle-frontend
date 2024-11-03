import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  email: string | null;
}

const initialState: CommonState = {
  email: null,
};

// Create common slice
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
  },
});

// Export actions and reducer
export const { setEmail } = commonSlice.actions;
export default commonSlice.reducer;
