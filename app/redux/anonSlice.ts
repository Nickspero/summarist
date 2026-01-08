import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AnonState {
  value: boolean
}

const initialState: AnonState = {
  value: false,
}

const anonSlice = createSlice({
  name: 'anon',
  initialState,
  reducers: {
    setAnonLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

export const { setAnonLoggedIn } = anonSlice.actions

export default anonSlice.reducer