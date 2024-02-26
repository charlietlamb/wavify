import { configureStore } from '@reduxjs/toolkit'
import audioReducer from './audio/audioSlice'
import floatingReducer from './floating/floatingSlice'
import chatReducer from './chat/chatSlice'
import userReducer from './user/userSlice'
import collectiveReducer from './collective/collectiveSlice'
import spaceReducer from './space/spaceSlice'
import utilReducer from './util/utilSlice'
import sidebarReducer from './sidebar/sidebarSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      audio: audioReducer,
      floating: floatingReducer,
      chat: chatReducer,
      user: userReducer,
      collective: collectiveReducer,
      space: spaceReducer,
      util: utilReducer,
      sidebar: sidebarReducer,
    },
  })
}
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
