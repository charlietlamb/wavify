import { createSlice } from '@reduxjs/toolkit'

export interface SpaceState {
  space: Space | null
  saved: boolean
}

const initialState: SpaceState = {
  space: null,
  saved: false,
}

const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    setSpace: (state, action) => {
      state.space = action.payload
    },
    setSaved: (state, action) => {
      state.saved = action.payload
    },
  },
})

export const { setSpace, setSaved } = spaceSlice.actions

export default spaceSlice.reducer
