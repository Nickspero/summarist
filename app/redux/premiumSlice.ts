import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
  name: "premium",
  initialState: { isPremium: false },
  reducers: {
    setPremium(state, action) {
      state.isPremium = action.payload;
    },
  },
});

export const { setPremium } = premiumSlice.actions;
export default premiumSlice.reducer;
