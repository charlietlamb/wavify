import { createSlice } from '@reduxjs/toolkit'

export interface SidebarState {
  collective: boolean
  files: boolean
}

const initialState: SidebarState = {
  collective: true,
  files: true,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setCollective: (state, action) => {
      state.collective = action.payload
    },
    setFiles: (state, action) => {
      state.files = action.payload
    },
  },
})

export const { setCollective, setFiles } = sidebarSlice.actions

export default sidebarSlice.reducer
