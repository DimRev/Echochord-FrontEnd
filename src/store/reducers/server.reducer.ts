import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Server, VoiceChannel } from "../../services/api/server.service";
import { TextChannel } from "../../services/api/textChannel.service";
import { ChatMsg } from "../../services/api/ChatMsg.service";

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
    /*PRELOAD ALL USER'S SERVERS WITH RELEVANT DATA ON THEM
    - Keep track of where the user had left reading the msgs.
    - Then give the user his last read msg +- 20 msgs on first load
    - When user scrolls up/down add the new msgs to the cache
    - scroll up adds [...new.msgs,...state.msgs]
    - scroll down adds [state.msgs, new.msgs]
     */
    SET_SERVERS: (state, action: PayloadAction<Server[]>) => {
      state.servers = action.payload
    },


    /*UPON ENTERING A SERVER MAKES A "REFRESH" LOAD
    - Checks if there were new msgs added in the DB
    - Adds upto +- 20 msgs to each direction from the last read msg
    - If user already got +- 20 msgs in cache doesn't go though this action
    */
    SET_SELECTED_SERVER: (state, action: PayloadAction<string | undefined>) => {
      if (!action.payload) {
        state.selectedServer = null
        return
      }

      const selectedServer = state.servers.find(server => server._id === action.payload)
      if (!selectedServer) {
        console.error(`ERROR : ${action.type}, server ${action.payload} not found`)
        return
      }

      state.selectedServer = selectedServer
    },

    /*FOCUSES ON THE SELECTED TEXT CHANNEL
    - on first load into the text channel,
    - should activate the socket of the curr channel
    - keeps getting msgs into it in both directions depending on the user's scroll
    */
    SET_SELECTED_TEXT_CHANNEL: (state, action: PayloadAction<string | undefined>) => {
      if (!action.payload) {
        state.selectedTextChannel = null
        return
      }

      const selectedTextChannel = state.selectedServer?.textChannels.find(channel => channel.id === action.payload)
      if (selectedTextChannel) {
        state.selectedTextChannel = selectedTextChannel
        return
      }

      state.selectedTextChannel = null
    },

    /*JOIN A VOICE CHANNEL
    - While inside the voice channel the user should still be able to use the chat channels
    */
    SET_SELECTED_VOICE_CHANNEL: (state, action: PayloadAction<string | undefined>) => {
      if (!action.payload) {
        state.selectedVoiceChannel = null
        return
      }

      const selectedVoiceChannel = state.selectedServer?.textChannels.find(channel => channel.id === action.payload)
      if (selectedVoiceChannel) {
        state.selectedVoiceChannel = selectedVoiceChannel
        return
      }

      state.selectedVoiceChannel = null
    },

    /*  */
    SUBMIT_CHAT_MSG: (state, action: PayloadAction<ChatMsg>) => {
      if (!state.selectedTextChannel || !state.selectedServer) {
        // Debugging msg
        console.error(`ERROR : ${action.type}, SelectedTextChannel: ${state.selectedTextChannel?.id} | SelectedServer: ${state.selectedServer?._id}`)
        return
      }

      state.selectedTextChannel = {
        ...state.selectedTextChannel,
        chatMsgs: [...state.selectedTextChannel.chatMsgs, action.payload]
      }
    }
  }
})

export const {
  SET_SELECTED_SERVER,
  SET_SELECTED_TEXT_CHANNEL,
  SET_SELECTED_VOICE_CHANNEL,
  SET_SERVERS,
  SUBMIT_CHAT_MSG,
} = serverSlice.actions

export default serverSlice.reducer