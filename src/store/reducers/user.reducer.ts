import { createSlice } from "@reduxjs/toolkit";
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

  }
})

export default userSlice.reducer