import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Server, serverService } from "../../services/api/server.service";

interface serverState {
  servers: Server[],
  selectedServer: string,
  selectedTextChannel: string,
  selectedVoiceChannel: string
}

const initialState: serverState = {
  servers: [],
  selectedServer: '',
  selectedTextChannel: '',
  selectedVoiceChannel: '',
}

export const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    SET_SERVERS: (state, action: PayloadAction<Server[]>) => {
      state.servers = action.payload
    }
  }

})

export const setServersAsync = createAsyncThunk('server/setServersAsync',
  async () => {
    const newServers = await serverService.getServers()
    return newServers
  })

export const { SET_SERVERS } = serverSlice.actions

export default serverSlice.reducer