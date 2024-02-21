import { createSlice } from '@reduxjs/toolkit'

export interface SpaceState {
  space: Space | null
}

const initialState: SpaceState = {
  space: null,
}

const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    setSpace: (state, action) => {
      state.space = action.payload
    },
  },
})

export const { setSpace } = spaceSlice.actions

export default spaceSlice.reducer
