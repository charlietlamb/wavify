import { createSlice } from '@reduxjs/toolkit'

export interface CollectiveState {
  collective: Collective | null
  spaces: Space[] | null
  roles: Role[] | null
  colUsers: ColUserAndData[] | null
  colUser: ColUserAndData | null
  saved: boolean
}

const initialState: CollectiveState = {
  collective: null,
  spaces: null,
  roles: null,
  colUsers: null,
  colUser: null,
  saved: false,
}

const collectiveSlice = createSlice({
  name: 'collective',
  initialState,
  reducers: {
    setCollectiveState: (state, action) => {
      state = action.payload
    },
    setCollective: (state, action) => {
      state.collective = action.payload
    },
    setSpaces: (state, action) => {
      state.spaces = action.payload
    },
    setRoles: (state, action) => {
      state.roles = action.payload
    },
    setColUsers: (state, action) => {
      state.colUsers = action.payload
    },
    setColUser: (state, action) => {
      state.colUser = action.payload
    },
    setSaved: (state, action) => {
      state.saved = action.payload
    },
  },
})

export const {
  setCollectiveState,
  setCollective,
  setSpaces,
  setRoles,
  setColUsers,
  setColUser,
  setSaved,
} = collectiveSlice.actions

export default collectiveSlice.reducer
