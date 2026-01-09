import { createSlice } from "@reduxjs/toolkit";

export interface ToggleState {
  value: boolean
}

const initialState: ToggleState = {
  value: false,
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    open: (state) => { state.value = true; },
    close: (state) => { state.value = false; },
    toggle: (state) => {
      state.value = !state.value
    },
  },
})

export const { open, close, toggle } = menuSlice.actions

export default menuSlice.reducer