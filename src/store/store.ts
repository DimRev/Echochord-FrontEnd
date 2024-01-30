import { configureStore } from "@reduxjs/toolkit"

import serverReducer from "./reducers/server.reducer"
import userReducer from "./reducers/user.reducer"

export const store = configureStore({
  reducer: {
    server: serverReducer,
    user: userReducer,
  }
})



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch