import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../services/api/user.service";

interface userState {
  loggedinUser: User | null
}

const initialState: userState = {
  loggedinUser: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER: (state, action: PayloadAction<User>) => {
      state.loggedinUser = action.payload
    }
  }
})

export const { SET_USER } = userSlice.actions

export default userSlice.reducer