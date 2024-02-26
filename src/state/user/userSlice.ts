import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
  user: User | null
  collectives: Collective[]
}

const initialState: UserState = {
  user: null,
  collectives: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setCollectives: (state, action) => {
      state.collectives = action.payload
    },
  },
})

export const { setUser, setCollectives } = userSlice.actions

export default userSlice.reducer
