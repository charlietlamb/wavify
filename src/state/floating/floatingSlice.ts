import { createSlice } from '@reduxjs/toolkit'

export interface FloatingState {
  open: boolean
}

const initialState: FloatingState = {
  open: true,
}

const floatingSlice = createSlice({
  name: 'floating',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload
    },
  },
})

export const { setOpen } = floatingSlice.actions

export default floatingSlice.reducer
