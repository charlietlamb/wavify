import { createSlice } from '@reduxjs/toolkit'

export interface UtilState {
  spaceDrag: boolean
  spaceDragType: string
}

const initialState: UtilState = {
  spaceDrag: false,
  spaceDragType: 'text',
}

const utilSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {
    setSpaceDrag: (state, action) => {
      state.spaceDrag = action.payload
    },
    setSpaceDragType: (state, action) => {
      state.spaceDragType = action.payload
    },
  },
})

export const { setSpaceDrag, setSpaceDragType } = utilSlice.actions

export default utilSlice.reducer
