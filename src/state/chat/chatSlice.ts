import { createSlice } from '@reduxjs/toolkit'

export interface ChatState {
  toggle: boolean
}

const initialState: ChatState = {
  toggle: false,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.toggle = action.payload
    },
  },
})

export const { setToggle } = chatSlice.actions

export default chatSlice.reducer
