import { createSlice } from '@reduxjs/toolkit'

export interface ToggleState {
  value: boolean
}

const initialState: ToggleState = {
  value: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => { state.value = true; },
    close: (state) => { state.value = false; },
    toggle: (state) => {
      state.value = !state.value
    },
  },
})

export const { open, close, toggle } = modalSlice.actions

export default modalSlice.reducer