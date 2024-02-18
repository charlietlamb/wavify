import { configureStore } from '@reduxjs/toolkit'
import audioReducer from './audio/audioSlice'
import floatingReducer from './floating/floatingSlice'

export const store = configureStore({
  reducer: { audio: audioReducer, floating: floatingReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
