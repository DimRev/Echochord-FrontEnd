import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Server, VoiceChannel, serverService } from "../../services/api/server.service";
import { TextChannel } from "../../services/api/textChannel.service";

interface serverState {
  servers: Server[],
  selectedServer: Server | null,
  selectedTextChannel: TextChannel | null,
  selectedVoiceChannel: VoiceChannel | null
}

const initialState: serverState = {
  servers: [],
  selectedServer: null,
  selectedTextChannel: null,
  selectedVoiceChannel: null,
}

export const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    SET_SERVERS: (state, action: PayloadAction<Server[]>) => {
      state.servers = action.payload
    },

    SET_SELECTED_SERVER: (state, action: PayloadAction<string | undefined>) => {
      if (!action.payload) {
        state.selectedServer = null
        return
      }

      const selectedServer = state.servers.find(server => server._id === action.payload)
      if (!selectedServer) throw new Error(`ERROR : ${action.type}, server not found`)
      state.selectedServer = selectedServer
    },

    SET_SELECTED_TEXT_CHANNEL: (state, action: PayloadAction<string | undefined>) => {
      if (!action.payload) {
        state.selectedTextChannel = null
        return
      }

      const selectedTextChannel = state.selectedServer?.textChannels.find(channel => channel.id === action.payload)
      if (selectedTextChannel) return { ...state, selectedTextChannel: selectedTextChannel }
      return { ...state, selectedTextChannel: null }
      // if (!state.selectedServer) throw new Error(`ERROR : ${action.type}, no server selected`)
      // const selectedTextChannel = state.selectedServer.textChannels.find(channel => {
      //   return channel.id === action.payload
      // })
      // if (!selectedTextChannel) throw new Error(`ERROR : ${action.type}, channel not found`)
      // state.selectedTextChannel = selectedTextChannel
    },

    SET_SELECTED_VOICE_CHANNEL: (state, action: PayloadAction<string | undefined>) => {
      if (!action.payload) {
        state.selectedVoiceChannel = null
        return
      }

      if (!state.selectedServer) throw new Error(`ERROR : ${action.type}, no server selected`)
      const selectedVoiceChannel = state.selectedServer.textChannels.find(channel => {
        return channel.id === action.payload
      })
      if (!selectedVoiceChannel) throw new Error(`ERROR : ${action.type}, channel not found`)
      state.selectedVoiceChannel = selectedVoiceChannel
    },
  }

})

export const setServersAsync = createAsyncThunk('server/setServersAsync',
  async () => {
    const newServers = await serverService.getServers()
    return newServers
  })

export const {
  SET_SELECTED_SERVER,
  SET_SELECTED_TEXT_CHANNEL,
  SET_SELECTED_VOICE_CHANNEL,
  SET_SERVERS,
} = serverSlice.actions

export default serverSlice.reducer